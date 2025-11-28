import { useState, useEffect } from "react";
import { Play, Info, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMovieVideos, type Movie } from "@/services/tmdb";

interface VideoHeroSectionProps {
  movie: Movie | null;
}

const VideoHeroSection = ({ movie }: VideoHeroSectionProps) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!movie) return;
      
      setLoading(true);
      const key = await getMovieVideos(movie.id);
      setVideoKey(key);
      setLoading(false);
    };

    fetchVideo();
  }, [movie]);

  if (!movie) return null;

  return (
    <section className="relative h-[80vh] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : videoKey ? (
          <div className="relative w-full h-full">
            <iframe
              className="absolute inset-0 w-full h-full scale-150 md:scale-125"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoKey}&modestbranding=1&playsinline=1`}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.thumbnail})` }}
          />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container flex h-full items-center px-4 z-10">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="destructive" className="bg-red-600 text-white animate-pulse">
              🔥 TRENDING NOW
            </Badge>
            {movie.category && (
              <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground capitalize">
                {movie.category}
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl drop-shadow-2xl animate-fade-in">
            {movie.title}
          </h1>
          
          <p className="text-lg text-gray-200 md:text-xl max-w-lg drop-shadow-lg line-clamp-3 animate-fade-in">
            {movie.description}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.genre}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="text-accent">⭐</span>
              <span>{movie.rating}/10</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in">
            <Button 
              variant="default" 
              size="lg" 
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="h-5 w-5 fill-current" />
              Watch Trailer
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>

            {videoKey && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-primary bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoHeroSection;
