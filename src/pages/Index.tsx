import { Link } from "react-router-dom";
import { ArrowRight, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamingHeader from "@/components/StreamingHeader";
import CategoryFilter from "@/components/CategoryFilter";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";
import rrr from "@/assets/movies/rrr.jpg";
import pushpa from "@/assets/movies/pushpa.jpg";
import baahubali from "@/assets/movies/baahubali.jpg";
import arjunReddy from "@/assets/movies/arjun-reddy.jpg";
import eega from "@/assets/movies/eega.jpg";
import magadheera from "@/assets/movies/magadheera.jpg";
import alaVaikunthapurramuloo from "@/assets/movies/ala-vaikunthapurramuloo.jpg";
import rangasthalam from "@/assets/movies/rangasthalam.jpg";

import dhootha from "@/assets/series/dhootha.jpg";
import bhamakalapam from "@/assets/series/bhamakalapam.jpg";
import familyMan from "@/assets/series/family-man.jpg";
import scam1992 from "@/assets/series/scam1992.jpg";

import chhotaBheem from "@/assets/kids/chhota-bheem.jpg";
import doraemon from "@/assets/kids/doraemon.jpg";

import tv9 from "@/assets/channels/tv9-telugu.jpg";
import etv from "@/assets/channels/etv-telugu.jpg";
import starSports from "@/assets/channels/star-sports.jpg";

const Index = () => {
  // Telugu content with proper portrait posters (2:3 aspect ratio)
  const trendingMovies = [
    { id: '1', title: 'RRR', image: rrr, rating: 7.8, year: 2022, language: 'Telugu', type: 'movie' as const, badge: 'HOT' },
    { id: '2', title: 'Pushpa', image: pushpa, rating: 7.6, year: 2021, language: 'Telugu', type: 'movie' as const },
    { id: '3', title: 'Baahubali', image: baahubali, rating: 8.0, year: 2015, language: 'Telugu', type: 'movie' as const },
    { id: '4', title: 'Arjun Reddy', image: arjunReddy, rating: 8.1, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '5', title: 'Eega', image: eega, rating: 7.7, year: 2012, language: 'Telugu', type: 'movie' as const },
    { id: '6', title: 'Magadheera', image: magadheera, rating: 7.7, year: 2009, language: 'Telugu', type: 'movie' as const },
    { id: '7', title: 'Ala Vaikunthapurramuloo', image: alaVaikunthapurramuloo, rating: 7.3, year: 2020, language: 'Telugu', type: 'movie' as const },
    { id: '8', title: 'Rangasthalam', image: rangasthalam, rating: 8.2, year: 2018, language: 'Telugu', type: 'movie' as const },
  ];

  const popularSeries = [
    { id: '1', title: 'Dhootha', image: dhootha, rating: 7.7, year: 2023, language: 'Telugu', type: 'series' as const, badge: 'NEW' },
    { id: '2', title: 'Bhamakalapam', image: bhamakalapam, rating: 6.8, year: 2022, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'The Family Man', image: familyMan, rating: 8.7, year: 2021, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Scam 1992', image: scam1992, rating: 9.5, year: 2020, language: 'Telugu', type: 'series' as const },
  ];

  const liveChannels = [
    { id: '1', title: 'TV9 Telugu', image: tv9, language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '2', title: 'ETV Telugu', image: etv, language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '3', title: 'Star Sports 1', image: starSports, language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
  ];

  const kidsContent = [
    { id: '1', title: 'Chhota Bheem', image: chhotaBheem, rating: 7.2, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '2', title: 'Doraemon', image: doraemon, rating: 8.5, year: 2023, language: 'Telugu', type: 'series' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <main>
        {/* Premium Animated Hero Header */}
        <section className="relative border-b border-border overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">
          {/* Animated orbs background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" 
                 style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-[gradient_12s_ease_infinite]" 
                 style={{ backgroundSize: '200% 200%' }} />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="container px-4 py-16 md:py-20 relative z-10">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Animated TV Icon with glow */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-110 hover:rotate-6">
                  <Tv className="h-12 w-12 md:h-16 md:w-16 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50 rounded-2xl blur animate-[gradient_3s_ease_infinite]" 
                     style={{ backgroundSize: '200% auto', zIndex: -1 }} />
              </div>
              
              {/* Main title with 3D effect */}
              <div className="relative">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-sm opacity-50 animate-[gradient_4s_ease_infinite]"
                        style={{ backgroundSize: '200% auto' }}>
                    My TV
                  </span>
                  <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[gradient_4s_ease_infinite]"
                        style={{ backgroundSize: '200% auto' }}>
                    My TV
                  </span>
                  {/* Shimmer overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite]" 
                        style={{ backgroundSize: '200% 100%' }} />
                </h1>
              </div>
              
              {/* Subtitle with fade in */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in font-medium" 
                 style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                Your personal Telugu entertainment collection
                <span className="block text-sm mt-2 text-primary/80">Movies • Series • Live TV • Kids Content</span>
              </p>
              
              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-fade-in" 
                   style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }} />
            </div>
          </div>
        </section>

        <CategoryFilter />
        <div className="space-y-12 py-8 bg-gradient-to-b from-background via-background/95 to-background">
          <ContentCarousel title="Trending Telugu Movies" items={trendingMovies} />
          <LiveTVSection />
          
          {/* Telugu Channels Section */}
          <section className="py-8">
            <div className="container px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Telugu Entertainment Hub</h2>
                  <p className="text-muted-foreground">Watch live Telugu news, entertainment, movies & more</p>
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
                  { name: 'Star Maa', category: 'Entertainment', isLive: true },
                  { name: 'ETV Telugu', category: 'Entertainment', isLive: true },
                  { name: 'Gemini TV', category: 'Entertainment', isLive: true },
                  { name: 'Zee Telugu', category: 'Entertainment', isLive: true },
                  { name: 'V6 News Telugu', category: 'News', isLive: true },
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
          
          <ContentCarousel title="Telugu Movies & Series" items={popularSeries} />
          <ContentCarousel title="Telugu Live TV Channels" items={liveChannels} />
          <ContentCarousel title="Kids Telugu Content" items={kidsContent} />
        </div>
      </main>
    </div>
  );
};

export default Index;
