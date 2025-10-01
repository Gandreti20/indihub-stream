import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  language: string;
  type: 'movie' | 'series' | 'live';
  badge?: string;
}

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
}

const ContentCarousel = ({ title, items }: ContentCarouselProps) => {
  return (
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
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContentCard = ({ item }: { item: ContentItem }) => {
  const { toast } = useToast();

  const handlePlay = () => {
    toast({
      title: `Playing ${item.title}`,
      description: `${item.type} • ${item.language} • ${item.year}`,
    });
  };

  return (
    <Card 
      className="group relative min-w-[200px] overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
      onClick={handlePlay}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundImage: `linear-gradient(45deg, #6366f1, #8b5cf6, #a855f7)`,
          }}
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
          {item.year && <span>•</span>}
          <span>{item.language}</span>
          <span>•</span>
          <span className="capitalize">{item.type}</span>
        </div>
      </div>
    </Card>
  );
};

export default ContentCarousel;