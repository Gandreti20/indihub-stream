import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ContentCarousel from "@/components/ContentCarousel";
import LiveTVSection from "@/components/LiveTVSection";

const Index = () => {
  // Sample content data
  const trendingMovies = [
    { id: '1', title: 'RRR', image: '', rating: 8.8, year: 2022, language: 'Telugu', type: 'movie' as const, badge: 'HOT' },
    { id: '2', title: 'Pushpa', image: '', rating: 7.6, year: 2021, language: 'Telugu', type: 'movie' as const },
    { id: '3', title: 'KGF Chapter 2', image: '', rating: 8.4, year: 2022, language: 'Kannada', type: 'movie' as const },
    { id: '4', title: 'Gangubai Kathiawadi', image: '', rating: 7.8, year: 2022, language: 'Hindi', type: 'movie' as const },
    { id: '5', title: 'Sooryavanshi', image: '', rating: 5.6, year: 2021, language: 'Hindi', type: 'movie' as const },
    { id: '6', title: 'Bell Bottom', image: '', rating: 6.9, year: 2021, language: 'Hindi', type: 'movie' as const },
  ];

  const popularSeries = [
    { id: '1', title: 'The Family Man 3', image: '', rating: 8.7, year: 2023, language: 'Hindi', type: 'series' as const, badge: 'NEW' },
    { id: '2', title: 'Scam 1992', image: '', rating: 9.5, year: 2020, language: 'Hindi', type: 'series' as const },
    { id: '3', title: 'Mumbai Diaries 26/11', image: '', rating: 8.1, year: 2021, language: 'Hindi', type: 'series' as const },
    { id: '4', title: 'Arya', image: '', rating: 8.3, year: 2020, language: 'Tamil', type: 'series' as const },
    { id: '5', title: 'Criminal Justice', image: '', rating: 7.9, year: 2022, language: 'Hindi', type: 'series' as const },
    { id: '6', title: 'Rocket Boys', image: '', rating: 8.9, year: 2022, language: 'Hindi', type: 'series' as const },
  ];

  const liveChannels = [
    { id: '1', title: 'Star Sports 1', image: '', language: 'Hindi', type: 'live' as const, badge: 'LIVE' },
    { id: '2', title: 'Sony Entertainment', image: '', language: 'Hindi', type: 'live' as const, badge: 'LIVE' },
    { id: '3', title: 'Zee News', image: '', language: 'Hindi', type: 'live' as const, badge: 'LIVE' },
    { id: '4', title: 'Sun TV', image: '', language: 'Tamil', type: 'live' as const, badge: 'LIVE' },
    { id: '5', title: 'Vijay TV', image: '', language: 'Tamil', type: 'live' as const, badge: 'LIVE' },
    { id: '6', title: 'Asianet', image: '', language: 'Malayalam', type: 'live' as const, badge: 'LIVE' },
  ];

  const kidsContent = [
    { id: '1', title: 'Chhota Bheem', image: '', rating: 7.2, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '2', title: 'Motu Patlu', image: '', rating: 6.8, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '3', title: 'Doraemon', image: '', rating: 8.5, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '4', title: 'Shinchan', image: '', rating: 8.1, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '5', title: 'Oggy and Cockroaches', image: '', rating: 7.9, year: 2023, language: 'Hindi', type: 'series' as const },
    { id: '6', title: 'Tom and Jerry', image: '', rating: 8.7, year: 2023, language: 'English', type: 'series' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <main>
        <HeroSection />
        <CategoryFilter />
        <div className="space-y-8">
          <ContentCarousel title="Trending Movies" items={trendingMovies} />
          <LiveTVSection />
          <ContentCarousel title="Popular Web Series" items={popularSeries} />
          <ContentCarousel title="Live TV Channels" items={liveChannels} />
          <ContentCarousel title="Kids & Family" items={kidsContent} />
        </div>
      </main>
    </div>
  );
};

export default Index;
