import { useState, useEffect } from "react";
import { Play, Radio, Tv, Users, X, Heart, Search, Clock, Minimize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import StreamingHeader from "@/components/StreamingHeader";
import NavigationBreadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MiniPlayer from "@/components/MiniPlayer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Channel logos are now loaded from URLs directly

interface Channel {
  id: string;
  name: string;
  category: 'News' | 'Entertainment' | 'Movies' | 'Kids' | 'Music' | 'Sports' | 'Devotional' | 'Hollywood';
  isLive?: boolean;
  isYouTubeLive?: boolean;
  youtubeEmbedId?: string;
  language: string;
  description: string;
  viewerCount?: string;
  logo?: string;
}

interface RecentChannel {
  id: string;
  timestamp: number;
}

const TeluguChannels = () => {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [miniPlayerChannel, setMiniPlayerChannel] = useState<Channel | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('channel-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyWatched, setRecentlyWatched] = useState<RecentChannel[]>(() => {
    const saved = localStorage.getItem('recently-watched-channels');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('channel-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recently-watched-channels', JSON.stringify(recentlyWatched));
  }, [recentlyWatched]);

  const addToRecentlyWatched = (channelId: string) => {
    setRecentlyWatched(prev => {
      const filtered = prev.filter(item => item.id !== channelId);
      return [{ id: channelId, timestamp: Date.now() }, ...filtered].slice(0, 10);
    });
  };

  const toggleFavorite = (channelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFavorite = prev.includes(channelId);
      if (isFavorite) {
        toast({ title: "Removed from favorites" });
        return prev.filter(id => id !== channelId);
      } else {
        toast({ title: "Added to favorites" });
        return [...prev, channelId];
      }
    });
  };

  const channels: Channel[] = [
    // Live News Channels on YouTube
    {
      id: 'tv9-telugu',
      name: 'TV9 Telugu',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'II_m28Bm-iM',
      language: 'Telugu',
      description: '24/7 Telugu news channel with breaking news and political coverage',
      viewerCount: '45K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_kfL-smUNyEp4PgMfLdZK8KaD8KV_B8Y6XjRwdYoXM=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'abn-telugu',
      name: 'ABN Telugu',
      category: 'News', 
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'HoYsWagMFfE',
      language: 'Telugu',
      description: 'Andhra Pradesh and Telangana news updates',
      viewerCount: '32K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_lJH_8L-pvhLPHPkFLpwG0YxoKjHYMSQgXKSLXI=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'v6-news',
      name: 'V6 News',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'nrb8P8shbDk',
      language: 'Telugu',
      description: 'Telangana-focused news with live coverage',
      viewerCount: '28K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_kYB1E-LUCbkiA3X0L8LzqBWZ0PH5MHUqy37VHH-Q=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'tv5-news',
      name: 'TV5 News Telugu',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'LUnp_p497s0',
      language: 'Telugu',
      description: 'Breaking news from AP and Telangana',
      viewerCount: '22K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_n2c9qz4eBeyP9R3z8YrX9i7Dz4x1D_QxN_NMJA=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: '10tv-news',
      name: '10TV News',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'byG7EGw9NPs',
      language: 'Telugu',
      description: 'Telugu news with political coverage',
      viewerCount: '15K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_mVbO1h0V16yBWpX3eDVT8VxZZBX_MxJ5m8wZlf=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'ntv-news',
      name: 'NTV Telugu',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'ZOdMhWnVRAY',
      language: 'Telugu',
      description: 'Telugu news and current affairs',
      viewerCount: '18K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_nKfNGNuQ2wNNJw6p7b6xVGZYNc7zPq9t0D3X8YqA=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'sakshi-tv',
      name: 'Sakshi TV',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: '9kCcUipLPJM',
      language: 'Telugu',
      description: 'AP & Telangana breaking news',
      viewerCount: '25K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_lzGqn0LCl9oYq3OxBBtS08Km6dC1l-2XKtpVLl=s176-c-k-c0x00ffffff-no-rj'
    },
    
    // Entertainment Channels
    {
      id: 'star-maa',
      name: 'Star Maa',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu entertainment with serials and movies',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Star_Maa.svg/200px-Star_Maa.svg.png'
    },
    {
      id: 'zee-telugu',
      name: 'Zee Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Family entertainment with Telugu serials',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Zee_Telugu_2018.svg/200px-Zee_Telugu_2018.svg.png'
    },
    {
      id: 'gemini-tv',
      name: 'Gemini TV',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Telugu entertainment by Sun Network',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Gemini_TV.svg/200px-Gemini_TV.svg.png'
    },
    {
      id: 'etv-telugu',
      name: 'ETV Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu serials and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ETV_Telugu_Logo.svg/200px-ETV_Telugu_Logo.svg.png'
    },
    {
      id: 'colors-telugu',
      name: 'Colors Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Contemporary Telugu entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Colors_Telugu.svg/200px-Colors_Telugu.svg.png'
    },
    
    // Telugu Movie Channels
    {
      id: 'star-maa-movies',
      name: 'Star Maa Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Latest Telugu blockbuster movies',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Star_Maa_Movies.svg/200px-Star_Maa_Movies.svg.png'
    },
    {
      id: 'zee-cinemalu',
      name: 'Zee Cinemalu',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movies 24/7',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Zee_Cinemalu.svg/200px-Zee_Cinemalu.svg.png'
    },
    {
      id: 'gemini-movies',
      name: 'Gemini Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu cinema entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Gemini_Movies.svg/200px-Gemini_Movies.svg.png'
    },
    
    // Bollywood / Hindi Entertainment Channels
    {
      id: 'colors-tv',
      name: 'Colors TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Popular Hindi serials and reality shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Colors_TV.svg/200px-Colors_TV.svg.png'
    },
    {
      id: 'star-plus',
      name: 'Star Plus',
      category: 'Entertainment', 
      language: 'Hindi',
      description: 'Hindi family entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Star_Plus_2018.svg/200px-Star_Plus_2018.svg.png'
    },
    {
      id: 'zee-tv',
      name: 'Zee TV',
      category: 'Entertainment',
      language: 'Hindi', 
      description: 'Hindi entertainment channel',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Zee_TV_2017.svg/200px-Zee_TV_2017.svg.png'
    },
    {
      id: 'sony-tv',
      name: 'Sony TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Hindi serials and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Sony_Entertainment_Television_Logo_2023.svg/200px-Sony_Entertainment_Television_Logo_2023.svg.png'
    },
    {
      id: 'sab-tv',
      name: 'SAB TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Family comedy and entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sony_SAB_2021.svg/200px-Sony_SAB_2021.svg.png'
    },
    {
      id: 'and-tv',
      name: '& TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Hindi GEC channel by Zee',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/%26TV_logo.svg/200px-%26TV_logo.svg.png'
    },
    
    // Bollywood Movie Channels
    {
      id: 'sony-max',
      name: 'Sony Max',
      category: 'Movies',
      language: 'Hindi',
      description: 'Latest Bollywood movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Sony_MAX_logo.svg/200px-Sony_MAX_logo.svg.png'
    },
    {
      id: 'sony-max-2',
      name: 'Sony Max 2',
      category: 'Movies',
      language: 'Hindi',
      description: 'Classic Bollywood hits',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sony_Max_2.svg/200px-Sony_Max_2.svg.png'
    },
    {
      id: 'zee-cinema',
      name: 'Zee Cinema',
      category: 'Movies',
      language: 'Hindi',
      description: 'Hindi blockbuster movies',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Zee_Cinema_2017.svg/200px-Zee_Cinema_2017.svg.png'
    },
    {
      id: 'star-gold',
      name: 'Star Gold',
      category: 'Movies',
      language: 'Hindi',
      description: 'Classic and new Hindi movies',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Star_Gold.svg/200px-Star_Gold.svg.png'
    },
    {
      id: 'star-gold-2',
      name: 'Star Gold 2',
      category: 'Movies',
      language: 'Hindi',
      description: 'More Bollywood entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Star_Gold.svg/200px-Star_Gold.svg.png'
    },
    {
      id: 'colors-cineplex',
      name: 'Colors Cineplex',
      category: 'Movies',
      language: 'Hindi',
      description: 'Bollywood movies 24x7',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Colors_Cineplex.svg/200px-Colors_Cineplex.svg.png'
    },
    {
      id: 'zee-bollywood',
      name: 'Zee Bollywood',
      category: 'Movies',
      language: 'Hindi',
      description: 'Non-stop Bollywood action',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Zee_Bollywood.svg/200px-Zee_Bollywood.svg.png'
    },
    {
      id: 'zee-action',
      name: 'Zee Action',
      category: 'Movies',
      language: 'Hindi',
      description: 'Action-packed Bollywood films',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Zee_Cinema_2017.svg/200px-Zee_Cinema_2017.svg.png'
    },
    {
      id: 'uhd-movies',
      name: 'UTV Movies',
      category: 'Movies',
      language: 'Hindi',
      description: 'Premium Bollywood movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/UTV_Movies.svg/200px-UTV_Movies.svg.png'
    },
    
    // Hollywood Channels
    {
      id: 'star-movies',
      name: 'Star Movies',
      category: 'Hollywood',
      language: 'English',
      description: 'Hollywood blockbusters and premieres',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Star_Movies.svg/200px-Star_Movies.svg.png'
    },
    {
      id: 'hbo',
      name: 'HBO',
      category: 'Hollywood',
      language: 'English',
      description: 'Premium Hollywood content and originals',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/200px-HBO_logo.svg.png'
    },
    {
      id: 'movies-now',
      name: 'Movies Now',
      category: 'Hollywood',
      language: 'English',
      description: 'Hollywood movies 24/7',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Movies_Now_Logo.svg/200px-Movies_Now_Logo.svg.png'
    },
    {
      id: 'movies-now-2',
      name: 'Movies Now 2',
      category: 'Hollywood',
      language: 'English',
      description: 'More Hollywood entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Movies_Now_Logo.svg/200px-Movies_Now_Logo.svg.png'
    },
    {
      id: 'star-world',
      name: 'Star World',
      category: 'Hollywood',
      language: 'English',
      description: 'English entertainment and TV series',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/STAR_World.svg/200px-STAR_World.svg.png'
    },
    {
      id: 'zee-cafe',
      name: 'Zee Cafe',
      category: 'Hollywood',
      language: 'English',
      description: 'English TV shows and series',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Zee_Café.svg/200px-Zee_Café.svg.png'
    },
    {
      id: 'comedy-central',
      name: 'Comedy Central',
      category: 'Hollywood',
      language: 'English',
      description: 'Comedy shows and stand-up',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Comedy_Central_2011_logo.svg/200px-Comedy_Central_2011_logo.svg.png'
    },
    {
      id: 'fx',
      name: 'FX',
      category: 'Hollywood',
      language: 'English',
      description: 'Premium drama and original series',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/FX_International_logo.svg/200px-FX_International_logo.svg.png'
    },
    {
      id: 'sony-pix',
      name: 'Sony PIX',
      category: 'Hollywood',
      language: 'English',
      description: 'Hollywood action and thrillers',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Sony_Pix.svg/200px-Sony_Pix.svg.png'
    },
    {
      id: 'wb',
      name: 'Warner Bros. TV',
      category: 'Hollywood',
      language: 'English',
      description: 'Warner Bros movies and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Warner_Bros._Television_logo.svg/200px-Warner_Bros._Television_logo.svg.png'
    },
    
    // Sports Channels
    {
      id: 'star-sports-1',
      name: 'Star Sports 1',
      category: 'Sports',
      language: 'English',
      description: 'Live cricket, football and sports',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Star_Sports_2018_logo.svg/200px-Star_Sports_2018_logo.svg.png'
    },
    {
      id: 'star-sports-1-hindi',
      name: 'Star Sports 1 Hindi',
      category: 'Sports',
      language: 'Hindi',
      description: 'Sports coverage in Hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Star_Sports_2018_logo.svg/200px-Star_Sports_2018_logo.svg.png'
    },
    {
      id: 'star-sports-2',
      name: 'Star Sports 2',
      category: 'Sports',
      language: 'English',
      description: 'More live sports action',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Star_Sports_2018_logo.svg/200px-Star_Sports_2018_logo.svg.png'
    },
    {
      id: 'star-sports-3',
      name: 'Star Sports 3',
      category: 'Sports',
      language: 'English',
      description: 'Cricket and international sports',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Star_Sports_2018_logo.svg/200px-Star_Sports_2018_logo.svg.png'
    },
    {
      id: 'star-sports-select-1',
      name: 'Star Sports Select 1',
      category: 'Sports',
      language: 'English',
      description: 'Premium sports including La Liga, Serie A',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Star_Sports_2018_logo.svg/200px-Star_Sports_2018_logo.svg.png'
    },
    {
      id: 'star-sports-select-2',
      name: 'Star Sports Select 2',
      category: 'Sports',
      language: 'English',
      description: 'International football leagues',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Star_Sports_2018_logo.svg/200px-Star_Sports_2018_logo.svg.png'
    },
    {
      id: 'sony-sports-ten-1',
      name: 'Sony Sports Ten 1',
      category: 'Sports',
      language: 'English',
      description: 'WWE, UFC and combat sports',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Sony_TEN_1.svg/200px-Sony_TEN_1.svg.png'
    },
    {
      id: 'sony-sports-ten-2',
      name: 'Sony Sports Ten 2',
      category: 'Sports',
      language: 'English',
      description: 'UEFA Champions League and football',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Sony_TEN_2.svg/200px-Sony_TEN_2.svg.png'
    },
    {
      id: 'sony-sports-ten-3',
      name: 'Sony Sports Ten 3',
      category: 'Sports',
      language: 'Hindi',
      description: 'Sports in Hindi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sony_TEN_3.svg/200px-Sony_TEN_3.svg.png'
    },
    {
      id: 'sony-sports-ten-5',
      name: 'Sony Sports Ten 5',
      category: 'Sports',
      language: 'English',
      description: 'Tennis and golf coverage',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Sony_TEN_5.svg/200px-Sony_TEN_5.svg.png'
    },
    {
      id: 'dd-sports',
      name: 'DD Sports',
      category: 'Sports',
      isYouTubeLive: true,
      youtubeEmbedId: 'bWL9_DzI16w',
      language: 'Hindi',
      description: 'Free live sports by Doordarshan',
      viewerCount: '12K',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/DD_Sports_Logo.svg/200px-DD_Sports_Logo.svg.png'
    },
    {
      id: 'espn',
      name: 'ESPN',
      category: 'Sports',
      language: 'English',
      description: 'International sports network',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png'
    },
    {
      id: 'eurosport',
      name: 'Eurosport',
      category: 'Sports',
      language: 'English',
      description: 'Olympics, tennis and cycling',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Eurosport_Logo_2015.svg/200px-Eurosport_Logo_2015.svg.png'
    },
    {
      id: 'sports18-1',
      name: 'Sports18 1',
      category: 'Sports',
      language: 'English',
      description: 'FIFA World Cup and football',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Sports18_logo.svg/200px-Sports18_logo.svg.png'
    },
    {
      id: 'sports18-2',
      name: 'Sports18 2',
      category: 'Sports',
      language: 'English',
      description: 'More live sports coverage',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Sports18_logo.svg/200px-Sports18_logo.svg.png'
    },
    {
      id: 'fancode',
      name: 'FanCode',
      category: 'Sports',
      language: 'English',
      description: 'Digital sports streaming',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/FanCode_Logo.svg/200px-FanCode_Logo.svg.png'
    },
    
    // Kids Channels
    {
      id: 'pogo',
      name: 'Pogo',
      category: 'Kids',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'UVEkJJ17fF4',
      language: 'Hindi',
      description: 'Hindi cartoons and kids shows',
      viewerCount: '6K',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Pogo_TV.svg/200px-Pogo_TV.svg.png'
    },
    {
      id: 'cartoon-network',
      name: 'Cartoon Network',
      category: 'Kids',
      language: 'English',
      description: 'International cartoons and animation',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/200px-Cartoon_Network_2010_logo.svg.png'
    },
    {
      id: 'disney-channel',
      name: 'Disney Channel',
      category: 'Kids', 
      language: 'English',
      description: 'Disney movies and shows for kids',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Disney_Channel_2019.svg/200px-Disney_Channel_2019.svg.png'
    },
    {
      id: 'nick',
      name: 'Nickelodeon',
      category: 'Kids',
      language: 'English',
      description: 'Nick Jr. shows and cartoons',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Nickelodeon_2023_logo_%28outline%29.svg/200px-Nickelodeon_2023_logo_%28outline%29.svg.png'
    },
    {
      id: 'nick-jr',
      name: 'Nick Jr.',
      category: 'Kids',
      language: 'English',
      description: 'Preschool programming',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Nick_Jr._logo_2009.svg/200px-Nick_Jr._logo_2009.svg.png'
    },
    {
      id: 'hungama',
      name: 'Hungama TV',
      category: 'Kids',
      language: 'Hindi',
      description: 'Hindi kids entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Hungama_TV_Logo.svg/200px-Hungama_TV_Logo.svg.png'
    },
    {
      id: 'sonic',
      name: 'Sonic Nickelodeon',
      category: 'Kids',
      language: 'Hindi',
      description: 'Action cartoons for kids',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Sonic_Nickelodeon_logo.svg/200px-Sonic_Nickelodeon_logo.svg.png'
    },
    {
      id: 'disney-junior',
      name: 'Disney Junior',
      category: 'Kids',
      language: 'English',
      description: 'Disney for preschoolers',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Disney_Junior_logo.svg/200px-Disney_Junior_logo.svg.png'
    },
    
    // Music Channels
    {
      id: 'maa-music',
      name: 'Maa Music',
      category: 'Music',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'OrWp3xLd7KE',
      language: 'Telugu',
      description: 'Telugu music videos and songs',
      viewerCount: '3K',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Maa_Music.svg/200px-Maa_Music.svg.png'
    },
    {
      id: 'mtv',
      name: 'MTV India',
      category: 'Music',
      language: 'Hindi',
      description: 'Hindi music videos and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/MTV_Logo.svg/200px-MTV_Logo.svg.png'
    },
    {
      id: 'vh1',
      name: 'VH1 India',
      category: 'Music',
      language: 'English',
      description: 'International music and pop culture',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/VH1_2013.svg/200px-VH1_2013.svg.png'
    },
    {
      id: '9xm',
      name: '9XM',
      category: 'Music',
      language: 'Hindi',
      description: 'Bollywood music channel',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/9XM_logo.svg/200px-9XM_logo.svg.png'
    },
    {
      id: 'b4u-music',
      name: 'B4U Music',
      category: 'Music',
      language: 'Hindi',
      description: 'Non-stop Bollywood music',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/B4U_Music_logo.svg/200px-B4U_Music_logo.svg.png'
    },
    
    // Devotional Channels
    {
      id: 'bhakti-tv',
      name: 'Bhakti TV',
      category: 'Devotional',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'BXRcVXUlOuo',
      language: 'Telugu',
      description: 'Spiritual and devotional content',
      viewerCount: '8K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_k1HmHXuVH5j1qGxS3OuXoLfQp6fN4LzB5mMQvbVQ=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'svbc-ttd',
      name: 'SVBC TTD',
      category: 'Devotional',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'VtXR9UiRZwM',
      language: 'Telugu',
      description: 'Tirumala Tirupati Devasthanams live',
      viewerCount: '12K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_mYq-O5kqRPtX4FmGJLMXEbLgx5Xr7E5FZv9V5n=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'subhavaartha-tv',
      name: 'Subhavaartha TV',
      category: 'Devotional',
      isLive: true,
      isYouTubeLive: true,
      youtubeEmbedId: 'hzXhY5_vEKI',
      language: 'Telugu',
      description: 'Christian devotional channel',
      viewerCount: '5K',
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_lPdQEZFv_X3t_4bS7i8Vd5l3ZiP2F7Z-d9Wd_m=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'aastha',
      name: 'Aastha TV',
      category: 'Devotional',
      language: 'Hindi',
      description: 'Hindu devotional programming',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Aastha_TV_logo.svg/200px-Aastha_TV_logo.svg.png'
    },
    {
      id: 'peace-of-mind',
      name: 'Peace of Mind TV',
      category: 'Devotional',
      language: 'Hindi',
      description: 'Brahma Kumaris spiritual content',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Peace_of_Mind_TV.svg/200px-Peace_of_Mind_TV.svg.png'
    }
  ];

  const handleChannelClick = (channel: Channel) => {
    if (channel.isYouTubeLive && channel.youtubeEmbedId) {
      // If modal is open, switch channel in modal
      if (isPlayerOpen) {
        setSelectedChannel(channel);
      } else {
        // Otherwise open in mini player
        setMiniPlayerChannel(channel);
      }
      addToRecentlyWatched(channel.id);
      toast({
        title: `Now playing: ${channel.name}`,
        description: "Stream loaded in mini player",
      });
    } else {
      toast({
        title: channel.name,
        description: "This channel is not available for streaming",
        variant: "destructive"
      });
    }
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedChannel(null);
  };

  const closeMiniPlayer = () => {
    setMiniPlayerChannel(null);
  };

  const handleMiniPlayerChannelChange = (newChannel: Channel) => {
    setMiniPlayerChannel(newChannel);
    addToRecentlyWatched(newChannel.id);
  };

  const expandMiniPlayer = () => {
    if (miniPlayerChannel) {
      setSelectedChannel(miniPlayerChannel);
      setIsPlayerOpen(true);
      setMiniPlayerChannel(null);
    }
  };

  const minimizeToMiniPlayer = () => {
    if (selectedChannel) {
      setMiniPlayerChannel(selectedChannel);
      setIsPlayerOpen(false);
      setSelectedChannel(null);
    }
  };

  const getRecentChannels = () => {
    return recentlyWatched
      .map(item => channels.find(c => c.id === item.id))
      .filter((c): c is Channel => c !== undefined);
  };

  const categories = ['All', 'Favorites', 'Recent', 'News', 'Entertainment', 'Movies', 'Hollywood', 'Kids', 'Music', 'Sports', 'Devotional'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const recentChannels = getRecentChannels();

  const filteredChannels = channels
    .filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           channel.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Favorites') return favorites.includes(channel.id);
      if (selectedCategory === 'Recent') return recentlyWatched.some(r => r.id === channel.id);
      return channel.category === selectedCategory;
    });

  const liveChannelsCount = channels.filter(c => c.isYouTubeLive).length;
  const favoritesCount = favorites.length;
  const recentCount = recentlyWatched.length;

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <NavigationBreadcrumb />
      <div className="container px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            TV Channels
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Telugu, Hindi, Kids & Sports channels - all in one place
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="secondary" className="bg-accent text-accent-foreground px-3 py-1">
              <Radio className="h-3 w-3 mr-1" />
              {liveChannelsCount} Live Channels
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Tv className="h-3 w-3 mr-1" />
              {channels.length} Total Channels
            </Badge>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category === 'Favorites' && <Heart className="h-3 w-3 mr-1" />}
              {category === 'Recent' && <Clock className="h-3 w-3 mr-1" />}
              {category}
              {category === 'Favorites' ? (
                <Badge variant="secondary" className="ml-2 text-xs bg-secondary/50">
                  {favoritesCount}
                </Badge>
              ) : category === 'Recent' ? (
                <Badge variant="secondary" className="ml-2 text-xs bg-secondary/50">
                  {recentCount}
                </Badge>
              ) : category !== 'All' && (
                <Badge variant="secondary" className="ml-2 text-xs bg-secondary/50">
                  {channels.filter(c => c.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Recently Watched Section */}
        {recentChannels.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Recently Watched</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {recentChannels.slice(0, 6).map((channel) => (
                <div key={`recent-${channel.id}`} className="flex-shrink-0 w-48">
                  <ChannelCard 
                    channel={channel} 
                    onClick={() => handleChannelClick(channel)}
                    isFavorite={favorites.includes(channel.id)}
                    onToggleFavorite={(e) => toggleFavorite(channel.id, e)}
                    showPreview
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Channels Grid */}
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {selectedCategory === 'All' ? 'All Channels' : selectedCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredChannels.map((channel) => (
            <ChannelCard 
              key={channel.id} 
              channel={channel} 
              onClick={() => handleChannelClick(channel)}
              isFavorite={favorites.includes(channel.id)}
              onToggleFavorite={(e) => toggleFavorite(channel.id, e)}
              showPreview
            />
          ))}
        </div>

        {/* Live Stream Player Modal */}
        {isPlayerOpen && selectedChannel && selectedChannel.youtubeEmbedId && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl bg-card rounded-lg overflow-hidden">
              {/* Player Header */}
              <div className="flex items-center justify-between p-4 bg-background border-b">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground animate-pulse">
                    <Radio className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                  <h3 className="text-lg font-semibold">{selectedChannel.name}</h3>
                  {selectedChannel.viewerCount && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {selectedChannel.viewerCount}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={minimizeToMiniPlayer} title="Minimize to PiP">
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={closePlayer}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* YouTube Player */}
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedChannel.youtubeEmbedId}?autoplay=1&mute=0`}
                  title={selectedChannel.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mini PiP Player */}
        {miniPlayerChannel && miniPlayerChannel.youtubeEmbedId && (
          <MiniPlayer
            channel={miniPlayerChannel}
            allChannels={channels}
            onClose={closeMiniPlayer}
            onExpand={expandMiniPlayer}
            onChannelChange={handleMiniPlayerChannelChange}
          />
        )}
      </div>
    </div>
  );
};

const ChannelCard = ({ 
  channel, 
  onClick,
  isFavorite,
  onToggleFavorite,
  showPreview = false
}: { 
  channel: Channel; 
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  showPreview?: boolean;
}) => {
  const [logoError, setLogoError] = useState(false);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'News': return 'bg-red-500/90';
      case 'Entertainment': return 'bg-purple-500/90';
      case 'Movies': return 'bg-blue-500/90';
      case 'Kids': return 'bg-green-500/90';
      case 'Music': return 'bg-pink-500/90';
      case 'Sports': return 'bg-orange-500/90';
      case 'Devotional': return 'bg-yellow-500/90';
      default: return 'bg-gray-500/90';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'News': return 'from-red-600/30 via-red-500/20 to-red-400/10';
      case 'Entertainment': return 'from-purple-600/30 via-purple-500/20 to-pink-400/10';
      case 'Movies': return 'from-blue-600/30 via-blue-500/20 to-cyan-400/10';
      case 'Kids': return 'from-green-500/30 via-emerald-500/20 to-teal-400/10';
      case 'Music': return 'from-pink-600/30 via-rose-500/20 to-fuchsia-400/10';
      case 'Sports': return 'from-orange-600/30 via-amber-500/20 to-yellow-400/10';
      case 'Devotional': return 'from-yellow-500/30 via-amber-400/20 to-orange-300/10';
      default: return 'from-gray-600/30 via-gray-500/20 to-slate-400/10';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 3).toUpperCase();
  };

  const isClickable = channel.isYouTubeLive && channel.youtubeEmbedId;

  const cardContent = (
    <Card 
      className={`group relative overflow-hidden bg-card border transition-all duration-300 ${
        isClickable 
          ? 'cursor-pointer hover:border-primary/50 hover:shadow-lg hover:scale-105' 
          : 'cursor-default opacity-75'
      }`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className={`aspect-video relative bg-gradient-to-br ${getCategoryGradient(channel.category)} flex items-center justify-center p-4`}>
        {channel.logo && !logoError ? (
          <img 
            src={channel.logo} 
            alt={channel.name}
            className="max-h-16 max-w-[80%] object-contain drop-shadow-lg"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-primary-foreground">{getInitials(channel.name)}</span>
            </div>
            <h3 className="font-semibold text-foreground text-sm leading-tight">{channel.name}</h3>
          </div>
        )}
        
        {/* Live Indicator */}
        {channel.isLive && (
          <div className="absolute top-2 left-2">
            <Badge 
              variant="secondary" 
              className={`${channel.isYouTubeLive ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'} text-xs animate-pulse gap-1`}
            >
              <Radio className="h-2 w-2" />
              {channel.isYouTubeLive ? 'LIVE' : 'TV'}
            </Badge>
          </div>
        )}
        
        {/* YouTube Badge */}
        {channel.isYouTubeLive && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-red-600 text-white text-xs">
              Free
            </Badge>
          </div>
        )}
        
        {/* Viewer Count */}
        {channel.viewerCount && channel.isYouTubeLive && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded text-xs text-white">
            <Users className="h-2 w-2" />
            {channel.viewerCount}
          </div>
        )}
        
        {/* Play Button on Hover */}
        {isClickable && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <Button 
              variant="secondary" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1 bg-primary text-primary-foreground"
            >
              <Play className="h-3 w-3" />
              Watch
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Badge 
            variant="secondary" 
            className={`${getCategoryColor(channel.category)} text-white text-xs`}
          >
            {channel.category}
          </Badge>
          <button
            onClick={onToggleFavorite}
            className="p-1.5 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isFavorite 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-muted-foreground hover:text-red-500'
              }`} 
            />
          </button>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {channel.description}
        </p>
      </div>
    </Card>
  );

  // Show preview on hover for YouTube channels
  if (showPreview && channel.isYouTubeLive && channel.youtubeEmbedId) {
    return (
      <HoverCard openDelay={300} closeDelay={100}>
        <HoverCardTrigger asChild>
          {cardContent}
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-0 overflow-hidden" side="right" align="start">
          <div className="aspect-video relative">
            <img 
              src={`https://img.youtube.com/vi/${channel.youtubeEmbedId}/hqdefault.jpg`}
              alt={`${channel.name} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="bg-red-600 text-white text-xs animate-pulse">
                  <Radio className="h-2 w-2 mr-1" />
                  LIVE
                </Badge>
                {channel.viewerCount && (
                  <span className="text-xs text-white/80 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {channel.viewerCount} watching
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-white text-sm">{channel.name}</h4>
              <p className="text-xs text-white/70 line-clamp-2">{channel.description}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return cardContent;
};

export default TeluguChannels;