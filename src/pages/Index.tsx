import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamingHeader from "@/components/StreamingHeader";
import NavigationBreadcrumb from "@/components/Breadcrumb";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";

// Import images
import rrrImage from "@/assets/movies/rrr.jpg";
import pushpaImage from "@/assets/movies/pushpa.jpg";
import kgf2Image from "@/assets/movies/kgf2.jpg";
import familyManImage from "@/assets/series/family-man.jpg";
import starSportsImage from "@/assets/channels/star-sports.jpg";
import chhotaBheemImage from "@/assets/kids/chhota-bheem.jpg";

const Index = () => {
  // Sample content data
  const trendingMovies = [
    { id: '1', title: 'RRR', image: rrrImage, rating: 8.8, year: 2022, language: 'Telugu', type: 'movie' as const, badge: 'HOT' },
    { id: '2', title: 'Pushpa', image: pushpaImage, rating: 7.6, year: 2021, language: 'Telugu', type: 'movie' as const },
    { id: '3', title: 'KGF Chapter 2', image: kgf2Image, rating: 8.4, year: 2022, language: 'Kannada', type: 'movie' as const },
    { id: '4', title: 'Gangubai Kathiawadi', image: '', rating: 7.8, year: 2022, language: 'Hindi', type: 'movie' as const },
    { id: '5', title: 'Sooryavanshi', image: '', rating: 5.6, year: 2021, language: 'Hindi', type: 'movie' as const },
    { id: '6', title: 'Bell Bottom', image: '', rating: 6.9, year: 2021, language: 'Hindi', type: 'movie' as const },
  ];

  const popularSeries = [
    { id: '1', title: 'The Family Man 3', image: familyManImage, rating: 8.7, year: 2023, language: 'Hindi', type: 'series' as const, badge: 'NEW' },
    { id: '2', title: 'Scam 1992', image: '', rating: 9.5, year: 2020, language: 'Hindi', type: 'series' as const },
    { id: '3', title: 'Mumbai Diaries 26/11', image: '', rating: 8.1, year: 2021, language: 'Hindi', type: 'series' as const },
    { id: '4', title: 'Arya', image: '', rating: 8.3, year: 2020, language: 'Tamil', type: 'series' as const },
    { id: '5', title: 'Criminal Justice', image: '', rating: 7.9, year: 2022, language: 'Hindi', type: 'series' as const },
    { id: '6', title: 'Rocket Boys', image: '', rating: 8.9, year: 2022, language: 'Hindi', type: 'series' as const },
  ];

  const liveChannels = [
    { id: '1', title: 'Star Sports 1', image: starSportsImage, language: 'Hindi', type: 'live' as const, badge: 'LIVE' },
    { id: '2', title: 'Sony Entertainment', image: '', language: 'Hindi', type: 'live' as const, badge: 'LIVE' },
    { id: '3', title: 'Zee News', image: '', language: 'Hindi', type: 'live' as const, badge: 'LIVE' },
    { id: '4', title: 'Sun TV', image: '', language: 'Tamil', type: 'live' as const, badge: 'LIVE' },
    { id: '5', title: 'Vijay TV', image: '', language: 'Tamil', type: 'live' as const, badge: 'LIVE' },
    { id: '6', title: 'Asianet', image: '', language: 'Malayalam', type: 'live' as const, badge: 'LIVE' },
  ];

  const kidsContent = [
    { id: '1', title: 'Chhota Bheem', image: chhotaBheemImage, rating: 7.2, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '2', title: 'Motu Patlu', image: '', rating: 6.8, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '3', title: 'Doraemon', image: '', rating: 8.5, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '4', title: 'Shinchan', image: '', rating: 8.1, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '5', title: 'Oggy and Cockroaches', image: '', rating: 7.9, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '6', title: 'Tom and Jerry', image: '', rating: 8.7, year: 2023, language: 'English', type: 'series' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <NavigationBreadcrumb />
      <main>
        <HeroSection />
        <CategoryFilter />
        <div className="space-y-8">
          <ContentCarousel title="Trending Movies" items={trendingMovies} />
          <LiveTVSection />
          
          {/* Telugu Channels Section */}
          <section className="py-8">
            <div className="container px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Telugu TV Channels</h2>
                  <p className="text-muted-foreground">Watch live Telugu news, entertainment & more</p>
                </div>
                <Link to="/telugu-channels">
                  <Button variant="outline" className="gap-2">
                    View All Channels
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'TV9 Telugu', category: 'News', isLive: true },
                  { name: 'Star Maa', category: 'Entertainment', isLive: false },
                  { name: 'ABN Telugu', category: 'News', isLive: true },
                  { name: 'ETV Telugu', category: 'Entertainment', isLive: false },
                  { name: 'V6 News', category: 'News', isLive: true },
                  { name: 'Gemini TV', category: 'Entertainment', isLive: false },
                ].map((channel, index) => (
                  <Link key={index} to="/telugu-channels">
                    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs font-semibold text-center">{channel.name}</span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">{channel.category}</p>
                      {channel.isLive && (
                        <div className="text-center mt-1">
                          <span className="text-xs bg-live-indicator text-white px-1 rounded">LIVE</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          
          <ContentCarousel title="Popular Web Series" items={popularSeries} />
          <ContentCarousel title="Live TV Channels" items={liveChannels} />
          <ContentCarousel title="Kids & Family" items={kidsContent} />
        </div>
      </main>
    </div>
  );
};

export default Index;
