import { Tv, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";
import { getTrendingMovies, getPopularTeluguMovies, type Movie } from "@/services/tmdb";
const Index = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [trending, popular] = await Promise.all([getTrendingMovies(), getPopularTeluguMovies()]);
        setTrendingMovies(trending.slice(0, 12));
        setPopularMovies(popular.slice(0, 12));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  return <div className="min-h-screen bg-background">
      <StreamingHeader />
      <main>
        {/* Premium Animated Hero Header */}
        <section className="relative border-b border-border overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">
          {/* Animated orbs background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" style={{
            animationDelay: '2s'
          }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-[gradient_12s_ease_infinite]" style={{
            backgroundSize: '200% 200%'
          }} />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="container px-4 py-16 md:py-20 relative z-10">
            <div className="flex-col text-center space-y-6 flex items-center justify-center border-primary">
              {/* Animated TV Icon with glow */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-110 hover:rotate-6">
                  <Tv className="h-12 w-12 md:h-16 md:w-16 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50 rounded-2xl blur animate-[gradient_3s_ease_infinite]" style={{
                backgroundSize: '200% auto',
                zIndex: -1
              }} />
              </div>
              
              {/* Main title with 3D effect */}
              <div className="relative">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-sm opacity-50 animate-[gradient_4s_ease_infinite]" style={{
                  backgroundSize: '200% auto'
                }}>
                    My TV
                  </span>
                  <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[gradient_4s_ease_infinite]" style={{
                  backgroundSize: '200% auto'
                }}>
                    My TV
                  </span>
                  {/* Shimmer overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite]" style={{
                  backgroundSize: '200% 100%'
                }} />
                </h1>
              </div>
              
              {/* Subtitle with fade in */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in font-medium" style={{
              animationDelay: '0.3s',
              opacity: 0,
              animationFillMode: 'forwards'
            }}>
                Your personal Telugu entertainment collection
                <span className="block text-sm mt-2 text-primary/80">Movies • Series • Live TV • Kids Content</span>
              </p>
              
              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-fade-in" style={{
              animationDelay: '0.5s',
              opacity: 0,
              animationFillMode: 'forwards'
            }} />
            </div>
          </div>
        </section>

        <div className="space-y-12 py-8 bg-gradient-to-b from-background via-background/95 to-background">
          {loading ? <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div> : <>
              {trendingMovies.length > 0 && <ContentCarousel title="🔥 Trending Telugu Movies" items={trendingMovies} />}
              <LiveTVSection />
              {popularMovies.length > 0 && <ContentCarousel title="⭐ Popular Telugu Movies" items={popularMovies} />}
            </>}
        </div>
      </main>
    </div>;
};
export default Index;