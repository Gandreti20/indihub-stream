import { ChevronLeft, ChevronRight, Play, Star, Clock, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { getMovieVideos } from "@/services/tmdb";

interface ContentItem {
  id: string;
  title: string;
  image?: string;
  rating?: number;
  year?: number;
  language?: string;
  type?: 'movie' | 'series' | 'live';
  badge?: string;
  genre?: string;
  description?: string;
  duration?: string;
  thumbnail?: string;
  category?: string;
}

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
}

const ContentCarousel = ({ title, items }: ContentCarouselProps) => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const handleItemSelect = async (item: ContentItem) => {
    setSelectedItem(item);
    setVideoKey(null);
    setLoadingVideo(true);
    
    const key = await getMovieVideos(item.id);
    setVideoKey(key);
    setLoadingVideo(false);
  };

  return (
    <>
      <section className="py-8">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {items.map((item) => (
              <ContentCard key={item.id} item={item} onPlay={handleItemSelect} />
            ))}
          </div>
        </div>
      </section>

      {/* Content Player Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="flex-1 flex flex-col">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                {loadingVideo ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : videoKey ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    title={selectedItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={selectedItem.thumbnail || selectedItem.image} 
                      alt={selectedItem.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-4">
                    {selectedItem.description || 'No description available'}
                  </p>
                </div>
                <div className="space-y-2">
                  {selectedItem.year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedItem.year}</span>
                    </div>
                  )}
                  {selectedItem.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedItem.duration}</span>
                    </div>
                  )}
                  {selectedItem.rating && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm">{selectedItem.rating}/10</span>
                    </div>
                  )}
                  {selectedItem.genre && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedItem.genre}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const ContentCard = ({ item, onPlay }: { item: ContentItem; onPlay: (item: ContentItem) => void }) => {
  const handlePlay = () => {
    onPlay(item);
  };

  return (
    <Card 
      className="group relative min-w-[200px] overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
      onClick={handlePlay}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={item.thumbnail || item.image || '/placeholder.svg'} 
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="play" 
            size="lg" 
            className="gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            <Play className="h-5 w-5" />
            Play
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.badge && (
            <Badge 
              variant={item.badge === 'LIVE' ? 'destructive' : 'secondary'}
              className={item.badge === 'LIVE' ? 'bg-live-indicator animate-pulse' : 'bg-new-badge'}
            >
              {item.badge}
            </Badge>
          )}
        </div>
        
        {/* Rating */}
        {item.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
            <Star className="h-3 w-3 text-accent fill-accent" />
            <span className="text-xs text-white font-medium">{item.rating}</span>
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {item.year && <span>{item.year}</span>}
          {item.year && item.genre && <span>•</span>}
          {item.genre && <span>{item.genre}</span>}
        </div>
      </div>
    </Card>
  );
};

export default ContentCarousel;