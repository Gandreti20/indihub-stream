import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";
import VideoHeroSection from "@/components/VideoHeroSection";
import { getTrendingMovies, getPopularTeluguMovies, type Movie } from "@/services/tmdb";
const Index = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [trending, popular] = await Promise.all([getTrendingMovies(), getPopularTeluguMovies()]);
        // Use top 5 trending movies for hero rotation
        setHeroMovies(trending.slice(0, 5));
        setTrendingMovies(trending.slice(5, 17));
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
        {/* Video Hero Banner */}
        {heroMovies.length > 0 && <VideoHeroSection movies={heroMovies} />}

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