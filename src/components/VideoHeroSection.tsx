import { useState, useEffect } from "react";
import { Play, Info, Volume2, VolumeX, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMovieVideos, type Movie } from "@/services/tmdb";

interface VideoHeroSectionProps {
  movies: Movie[];
}

const VideoHeroSection = ({ movies }: VideoHeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  const currentMovie = movies[currentIndex];

  useEffect(() => {
    const fetchVideo = async () => {
      if (!currentMovie) return;
      
      setLoading(true);
      const key = await getMovieVideos(currentMovie.id);
      setVideoKey(key);
      setLoading(false);
    };

    fetchVideo();
  }, [currentMovie]);

  // Auto-rotate every 10 seconds if no video is playing
  useEffect(() => {
    if (!videoKey && movies.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [videoKey, movies.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  if (!currentMovie || movies.length === 0) return null;

  return (
    <section className="relative h-[80vh] overflow-hidden bg-black">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : videoKey ? (
          <div className="relative w-full h-full">
            <iframe
              key={videoKey}
              className="absolute inset-0 w-[100vw] h-[100vh] pointer-events-none"
              style={{
                transform: 'scale(1.5)',
                transformOrigin: 'center center'
              }}
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoKey}&modestbranding=1&playsinline=1&enablejsapi=1`}
              title={currentMovie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center animate-fade-in"
            style={{ backgroundImage: `url(${currentMovie.thumbnail})` }}
          />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Content */}
      <div className="relative container flex h-full items-center px-4 z-10">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="destructive" className="bg-red-600 text-white animate-pulse">
              🔥 TRENDING NOW
            </Badge>
            {currentMovie.category && (
              <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground capitalize">
                {currentMovie.category}
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
            {currentMovie.title}
          </h1>
          
          {currentMovie.description && (
            <p className="text-lg text-gray-200 md:text-xl max-w-lg drop-shadow-lg line-clamp-3">
              {currentMovie.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{currentMovie.year}</span>
            <span>•</span>
            <span>{currentMovie.genre}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="text-accent">⭐</span>
              <span>{currentMovie.rating}/10</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
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

          {/* Dots indicator */}
          {movies.length > 1 && (
            <div className="flex gap-2 pt-4">
              {movies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-primary' : 'w-1 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoHeroSection;
