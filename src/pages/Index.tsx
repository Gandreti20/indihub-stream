import { Link } from "react-router-dom";
import { ArrowRight, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamingHeader from "@/components/StreamingHeader";
import CategoryFilter from "@/components/CategoryFilter";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";

const Index = () => {
  // Telugu content with proper portrait posters (2:3 aspect ratio)
  const trendingMovies = [
    { id: '1', title: 'RRR', image: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg', rating: 7.8, year: 2022, language: 'Telugu', type: 'movie' as const, badge: 'HOT' },
    { id: '2', title: 'Pushpa', image: 'https://images.justwatch.com/poster/301464074/s718/pushpa-the-rise-part-1.jpg', rating: 7.6, year: 2021, language: 'Telugu', type: 'movie' as const },
    { id: '3', title: 'Baahubali 2', image: 'https://images.justwatch.com/poster/8618292/s718/baahubali-2-the-conclusion.jpg', rating: 8.0, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '4', title: 'Arjun Reddy', image: 'https://images.justwatch.com/poster/127476528/s718/arjun-reddy.jpg', rating: 8.1, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '5', title: 'Eega', image: 'https://images.justwatch.com/poster/240875862/s718/eega.jpg', rating: 7.7, year: 2012, language: 'Telugu', type: 'movie' as const },
    { id: '6', title: 'Magadheera', image: 'https://images.justwatch.com/poster/301540820/s718/magadheera.jpg', rating: 7.7, year: 2009, language: 'Telugu', type: 'movie' as const },
    { id: '7', title: 'Ala Vaikunthapurramuloo', image: 'https://images.justwatch.com/poster/174719677/s718/ala-vaikunthapurramuloo.jpg', rating: 7.3, year: 2020, language: 'Telugu', type: 'movie' as const },
    { id: '8', title: 'Rangasthalam', image: 'https://images.justwatch.com/poster/92161684/s718/rangasthalam.jpg', rating: 8.2, year: 2018, language: 'Telugu', type: 'movie' as const },
  ];

  const popularSeries = [
    { id: '1', title: 'Dhootha', image: 'https://images.justwatch.com/poster/306879776/s718/dhootha.jpg', rating: 7.7, year: 2023, language: 'Telugu', type: 'series' as const, badge: 'NEW' },
    { id: '2', title: 'Bhamakalapam', image: 'https://images.justwatch.com/poster/267846732/s718/bhamakalapam.jpg', rating: 6.8, year: 2022, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'The Family Man', image: 'https://images.justwatch.com/poster/243810833/s718/the-family-man.jpg', rating: 8.7, year: 2021, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Scam 1992', image: 'https://images.justwatch.com/poster/205213126/s718/scam-1992-the-harshad-mehta-story.jpg', rating: 9.5, year: 2020, language: 'Telugu', type: 'series' as const },
    { id: '5', title: 'Loser', image: 'https://images.justwatch.com/poster/186691776/s718/loser-2020.jpg', rating: 7.3, year: 2020, language: 'Telugu', type: 'series' as const },
    { id: '6', title: '3 Roses', image: 'https://images.justwatch.com/poster/300819264/s718/3-roses.jpg', rating: 7.4, year: 2022, language: 'Telugu', type: 'series' as const },
  ];

  const liveChannels = [
    { id: '1', title: 'TV9 Telugu', image: 'https://images.tv9telugu.com/wp-content/uploads/2019/09/tv9-telugu-logo.jpg', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '2', title: 'ETV Telugu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/ETV_Telugu_logo.png/512px-ETV_Telugu_logo.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '3', title: 'Star Sports 1', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Star_Sports_logo.svg/512px-Star_Sports_logo.svg.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '4', title: 'Gemini TV', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gemini_TV_logo.png/512px-Gemini_TV_logo.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '5', title: 'Zee Telugu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Zee_Telugu_logo.png/512px-Zee_Telugu_logo.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '6', title: 'Star Maa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Star_Maa_logo.png/512px-Star_Maa_logo.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
  ];

  const kidsContent = [
    { id: '1', title: 'Chhota Bheem', image: 'https://images.justwatch.com/poster/306842095/s718/chhota-bheem.jpg', rating: 7.2, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '2', title: 'Doraemon', image: 'https://images.justwatch.com/poster/176119414/s718/doraemon-1979.jpg', rating: 8.5, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'Motu Patlu', image: 'https://images.justwatch.com/poster/241056624/s718/motu-patlu.jpg', rating: 6.8, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Shinchan', image: 'https://images.justwatch.com/poster/8588249/s718/shin-chan.jpg', rating: 8.1, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '5', title: 'Oggy and Cockroaches', image: 'https://images.justwatch.com/poster/8592366/s718/oggy-and-the-cockroaches.jpg', rating: 7.9, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '6', title: 'Tom and Jerry', image: 'https://images.justwatch.com/poster/305319816/s718/tom-and-jerry.jpg', rating: 8.7, year: 2023, language: 'Telugu', type: 'series' as const },
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
