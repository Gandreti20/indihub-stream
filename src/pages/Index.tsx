import { Link } from "react-router-dom";
import { ArrowRight, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamingHeader from "@/components/StreamingHeader";
import CategoryFilter from "@/components/CategoryFilter";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";

const Index = () => {
  // Telugu content only - after 2000 with exact IMDB ratings
  const trendingMovies = [
    { id: '1', title: 'RRR', image: 'https://m.media-amazon.com/images/M/MV5BN2I1YzFjMDYtOWU3ZS00NTc3LWI0YzgtMzE1ZWIzNjQwYjNjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 7.8, year: 2022, language: 'Telugu', type: 'movie' as const, badge: 'HOT' },
    { id: '2', title: 'Pushpa', image: 'https://m.media-amazon.com/images/M/MV5BYTViMjJhZjItNDg1MS00NjA3LWJiNTgtNDFhNWU5MTIyNGM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 7.6, year: 2021, language: 'Telugu', type: 'movie' as const },
    { id: '3', title: 'Baahubali 2', image: 'https://m.media-amazon.com/images/M/MV5BNTliNGEzZDUtZmIzMC00YzA5LWE0MTMtODQxNGI0MTU3ZjdlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 8.0, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '4', title: 'Arjun Reddy', image: 'https://m.media-amazon.com/images/M/MV5BYzkyMWNhNzMtMWMwMS00NDA2LWI1YWQtNzE5ZmI0MDRmNGYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 8.1, year: 2017, language: 'Telugu', type: 'movie' as const },
    { id: '5', title: 'Eega', image: 'https://m.media-amazon.com/images/M/MV5BM2Y5ZmZlNzItOTYxYi00Y2E1LTljMWUtNWY5M2M2OGRlMGZjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 7.7, year: 2012, language: 'Telugu', type: 'movie' as const },
    { id: '6', title: 'Magadheera', image: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Magadheera_Poster.jpg', rating: 7.7, year: 2009, language: 'Telugu', type: 'movie' as const },
    { id: '7', title: 'Ala Vaikunthapurramuloo', image: 'https://m.media-amazon.com/images/M/MV5BOGMwZWM5NmEtOWNiNS00MWFhLWJkYmUtYzEzZDkyODEzMjE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 7.3, year: 2020, language: 'Telugu', type: 'movie' as const },
    { id: '8', title: 'Rangasthalam', image: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Rangasthalam.jpg', rating: 8.2, year: 2018, language: 'Telugu', type: 'movie' as const },
  ];

  const popularSeries = [
    { id: '1', title: 'Dhootha', image: 'https://upload.wikimedia.org/wikipedia/en/5/55/Dhootha.jpg', rating: 7.7, year: 2023, language: 'Telugu', type: 'series' as const, badge: 'NEW' },
    { id: '2', title: 'Bhamakalapam', image: 'https://upload.wikimedia.org/wikipedia/en/7/70/Bhamakalapam_film_poster.jpg', rating: 6.8, year: 2022, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'The Family Man', image: 'https://m.media-amazon.com/images/M/MV5BNmE3NmFiNTYtMjQwZi00NDBmLWI3ZGMtYTgzNGJkMDJkNzVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 8.7, year: 2021, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Scam 1992', image: 'https://m.media-amazon.com/images/M/MV5BNjgxZTMxNDItZTY1Yy00NmYyLWJiM2YtZmMxMzYxOTA3MTI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 9.5, year: 2020, language: 'Telugu', type: 'series' as const },
    { id: '5', title: 'Loser', image: 'https://m.media-amazon.com/images/M/MV5BNmE3NmFiNTYtMjQwZi00NDBmLWI3ZGMtYTgzNGJkMDJkNzVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 7.3, year: 2020, language: 'Telugu', type: 'series' as const },
    { id: '6', title: '3 Roses', image: 'https://upload.wikimedia.org/wikipedia/en/7/70/Bhamakalapam_film_poster.jpg', rating: 7.4, year: 2022, language: 'Telugu', type: 'series' as const },
  ];

  const liveChannels = [
    { id: '1', title: 'TV9 Telugu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/TV9_Telugu_Logo.png/1200px-TV9_Telugu_Logo.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '2', title: 'ETV Telugu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/ETV_Network_logo.svg/1200px-ETV_Network_logo.svg.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '3', title: 'Star Sports 1', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Star_Sports_logo.svg/1200px-Star_Sports_logo.svg.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '4', title: 'Gemini TV', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Gemini_TV.svg/1200px-Gemini_TV.svg.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '5', title: 'Zee Telugu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Zee_Telugu.svg/1200px-Zee_Telugu.svg.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
    { id: '6', title: 'Star Maa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Star_Maa_logo.svg/1200px-Star_Maa_logo.svg.png', language: 'Telugu', type: 'live' as const, badge: 'LIVE' },
  ];

  const kidsContent = [
    { id: '1', title: 'Chhota Bheem', image: 'https://www.chhotabheem.com/image/catalog/wallpapers/full-size-chhotabheem-and-friends-wallpaper.jpg', rating: 7.2, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '2', title: 'Doraemon Telugu', image: 'https://m.media-amazon.com/images/M/MV5BYzcyMzEzNDctNWU0Yy00YmQ3LWI1ZDgtNTVkYTFhMWQ4ZGNmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', rating: 8.5, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '3', title: 'Motu Patlu Telugu', image: 'https://upload.wikimedia.org/wikipedia/en/4/41/Motu_Patlu_Title_Card.jpg', rating: 6.8, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '4', title: 'Shinchan Telugu', image: 'https://m.media-amazon.com/images/M/MV5BMTYwMDYwNjEyMV5BMl5BanBnXkFtZTcwOTAxMjMyMw@@._V1_.jpg', rating: 8.1, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '5', title: 'Oggy Telugu', image: 'https://upload.wikimedia.org/wikipedia/en/6/63/Oggy_and_the_Cockroaches_logo.png', rating: 7.9, year: 2023, language: 'Telugu', type: 'series' as const },
    { id: '6', title: 'Tom and Jerry Telugu', image: 'https://m.media-amazon.com/images/M/MV5BMWZlMjdkNzMtODk5ZC00YWQ3LWI0YjgtNGM3NTU2MmQzN2ZiXkEyXkFqcGc@._V1_.jpg', rating: 8.7, year: 2023, language: 'Telugu', type: 'series' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <main>
        {/* Simple Welcome Header */}
        <section className="border-b border-border bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
          <div className="container px-4 py-12">
            <div className="flex items-center gap-3 mb-3">
              <Tv className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">My TV</h1>
            </div>
            <p className="text-muted-foreground text-lg">Your personal Telugu entertainment collection</p>
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
