import { Play, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>
      
      {/* Content */}
      <div className="relative container flex h-full items-center px-4">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="destructive" className="bg-live-indicator text-white">
              TRENDING #1
            </Badge>
            <Badge variant="secondary" className="bg-new-badge text-white">
              NEW EPISODE
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            The Family Man
          </h1>
          
          <p className="text-lg text-gray-200 md:text-xl max-w-lg">
            A middle-class man secretly works for the National Investigation Agency while 
            trying to protect his family from the dangers of his double life.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>2023</span>
            <span>•</span>
            <span>Action, Thriller</span>
            <span>•</span>
            <span>Hindi, Tamil, Telugu</span>
            <span>•</span>
            <span>U/A 16+</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button variant="hero" size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Watch Now
            </Button>
            
            <Button variant="watchlist" size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Watchlist
            </Button>
            
            <Button variant="ghost" size="lg" className="gap-2 text-white hover:text-accent">
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
      
      {/* Fade to content gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-content-gradient" />
    </section>
  );
};

export default HeroSection;