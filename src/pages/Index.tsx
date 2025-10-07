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
    { id: '2', title: 'Pushpa', image: 'https://m.media-amazon.com/images/M/MV5BNjM4MzBmNTctYzA1My00ZGFhLWJkZWEtN2M1OTJlOWYzYThiXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_FMjpg_UX1000_.jpg', rating: 7.6, year: 2021, language: 'Telugu', type: 'movie' as const },
    { id: '3', title: 'Baahubali 2', image: 'https://m.media-amazon.com/images/M/MV5BYTMyOWE1NzgtZWRkOC00OGE3LTkxMTctNWMyOWZhNjQ5NzZkXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg', rating: 8.0, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '4', title: 'Arjun Reddy', image: 'https://m.media-amazon.com/images/M/MV5BYjQ0NzU2ZmQtYzlkYS00NDM5LTlkYWUtMzRjNDMzOGFiYzU0XkEyXkFqcGdeQXVyNjEyNzM4OTM@._V1_FMjpg_UX1000_.jpg', rating: 8.1, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '5', title: 'Eega', image: 'https://m.media-amazon.com/images/M/MV5BODcyNTgzMjMwNV5BMl5BanBnXkFtZTgwMzkxNTI5MDE@._V1_FMjpg_UX1000_.jpg', rating: 7.7, year: 2012, language: 'Telugu', type: 'movie' as const },
    { id: '6', title: 'Magadheera', image: 'https://m.media-amazon.com/images/M/MV5BMTU3MTYwOTk1OV5BMl5BanBnXkFtZTcwMjI2MTMzMg@@._V1_FMjpg_UX1000_.jpg', rating: 7.7, year: 2009, language: 'Telugu', type: 'movie' as const },
    { id: '7', title: 'Ala Vaikunthapurramuloo', image: 'https://m.media-amazon.com/images/M/MV5BNjE2NTcwMzEyOF5BMl5BanBnXkFtZTgwMjMwOTk0ODE@._V1_FMjpg_UX1000_.jpg', rating: 7.3, year: 2020, language: 'Telugu', type: 'movie' as const },
    { id: '8', title: 'Rangasthalam', image: 'https://m.media-amazon.com/images/M/MV5BNDg1MDkzNWItM2E1Yi00YmVkLTlkNTEtZjE0ZTJhMGFjYTgwXkEyXkFqcGdeQXVyNTgxODMzMTg@._V1_FMjpg_UX1000_.jpg', rating: 8.2, year: 2018, language: 'Telugu', type: 'movie' as const },
  ];

  const popularSeries = [
    { id: '1', title: 'Dhootha', image: 'https://m.media-amazon.com/images/M/MV5BYmZlZTQ0YWYtYjZmMS00MjU2LWI4N2UtYTllMzNlMTE2MzkzXkEyXkFqcGdeQXVyNjcxNjc5NzY@._V1_FMjpg_UX1000_.jpg', rating: 7.7, year: 2023, language: 'Telugu', type: 'series' as const, badge: 'NEW' },
    { id: '2', title: 'Bhamakalapam', image: 'https://m.media-amazon.com/images/M/MV5BMjRlYTdmYzAtOTcyZC00OTQ1LTlkOTMtYTdhMzEwNDJjZjc1XkEyXkFqcGdeQXVyMzQ0NzQxOTQ@._V1_FMjpg_UX1000_.jpg', rating: 6.8, year: 2022, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'The Family Man', image: 'https://m.media-amazon.com/images/M/MV5BYjdkYzk4N2YtNzYxYy00OWNjLWE5OTctZGFjZWEyZTUxYWQ1XkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_FMjpg_UX1000_.jpg', rating: 8.7, year: 2021, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Scam 1992', image: 'https://m.media-amazon.com/images/M/MV5BNjgxZTM3NmQtY2Q1ZC00ZmNiLWJiNGQtODBkNjcxNDYxMDEyXkEyXkFqcGdeQXVyMTAyMTE1MDA5._V1_FMjpg_UX1000_.jpg', rating: 9.5, year: 2020, language: 'Telugu', type: 'series' as const },
    { id: '5', title: 'Loser', image: 'https://m.media-amazon.com/images/M/MV5BMmJjNWQ2MjItNWQ5Yy00ZmFhLWE4YjgtYTBkNWFmMzEzMWVlXkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_FMjpg_UX1000_.jpg', rating: 7.3, year: 2020, language: 'Telugu', type: 'series' as const },
    { id: '6', title: '3 Roses', image: 'https://m.media-amazon.com/images/M/MV5BYzlmZGQ2NTAtYjM2Zi00YWI4LWJjZGEtN2NhY2E2YmYyMTk4XkEyXkFqcGdeQXVyMTIwNzg4ODI0._V1_FMjpg_UX1000_.jpg', rating: 7.4, year: 2022, language: 'Telugu', type: 'series' as const },
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
    { id: '1', title: 'Chhota Bheem', image: 'https://m.media-amazon.com/images/M/MV5BMTM3NzA1MTktZWQ3ZS00MTEzLWE1OWMtMTE5NDI5NzAzZjM2XkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg', rating: 7.2, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '2', title: 'Doraemon Telugu', image: 'https://m.media-amazon.com/images/M/MV5BMzMzMDYwZjAtNjQ3NC00ZDJjLTk0ZWEtNTNhYzYyNzNjZGY0XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_FMjpg_UX1000_.jpg', rating: 8.5, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'Motu Patlu Telugu', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwJmqKFxO5TJdX8JZmLfqo1mM-_1zWvYoq1Q&s', rating: 6.8, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Shinchan Telugu', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8sH1pP3Y9xzp-x0yJK4k4O9bD_XN-2nJdnQ&s', rating: 8.1, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '5', title: 'Oggy Telugu', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_J3T2xNJ0eYqNpTKzFzjHYQwKOKy5zlKOQ&s', rating: 7.9, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '6', title: 'Tom and Jerry Telugu', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOaH0c1O9YL8hL8BFT8K0LdOOLyNpJl8fkQ&s', rating: 8.7, year: 2023, language: 'Telugu', type: 'series' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <main>
        {/* Animated Welcome Header */}
        <section className="relative border-b border-border bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 animate-[gradient_8s_ease_infinite] opacity-50" 
               style={{ backgroundSize: '200% 200%' }} />
          
          <div className="container px-4 py-12 relative z-10">
            <div className="flex items-center gap-3 mb-3 animate-fade-in">
              {/* Animated TV Icon with pulse and float */}
              <div className="relative">
                <Tv className="h-10 w-10 text-primary animate-[pulse_3s_ease-in-out_infinite]" />
                <div className="absolute inset-0 h-10 w-10 text-primary opacity-30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]">
                  <Tv className="h-10 w-10" />
                </div>
              </div>
              
              {/* Animated gradient text with shimmer effect */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] relative"
                  style={{ backgroundSize: '200% auto' }}>
                My TV
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                      style={{ backgroundSize: '200% 100%' }} />
              </h1>
            </div>
            
            {/* Animated subtitle with delay */}
            <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              Your personal Telugu entertainment collection
            </p>
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
