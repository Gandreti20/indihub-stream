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
  category: 'News' | 'Entertainment' | 'Kids' | 'Music' | 'Devotional';
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/TV9TeluguLogo.jpg/250px-TV9TeluguLogo.jpg'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/ABN_Andhra_Jyothi_2018.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/V6_News.jpg/250px-V6_News.jpg'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/TV5_Telugu_logo.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/10tv_telugu.jpg/243px-10tv_telugu.jpg'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/dc/NTV_Telugu_Logo.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Sakshi_TV_Logo.png/250px-Sakshi_TV_Logo.png'
    },
    
    // Entertainment Channels
    {
      id: 'star-maa',
      name: 'Star Maa',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu entertainment with serials and movies',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Star_maa_logo_2023.png/250px-Star_maa_logo_2023.png'
    },
    {
      id: 'zee-telugu',
      name: 'Zee Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Family entertainment with Telugu serials',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Zee_Telugu_2025.svg/250px-Zee_Telugu_2025.svg.png'
    },
    {
      id: 'gemini-tv',
      name: 'Gemini TV',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Telugu entertainment by Sun Network',
      logo: 'https://upload.wikimedia.org/wikipedia/en/6/63/Gemini_TV_Logo.png'
    },
    {
      id: 'etv-telugu',
      name: 'ETV Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu serials and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/de/ETVnewLogo.png/239px-ETVnewLogo.png'
    },
    {
      id: 'colors-telugu',
      name: 'Colors Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Contemporary Telugu entertainment',
      logo: 'https://static.wikia.nocookie.net/logopedia/images/8/8b/Colors_Telugu.png'
    },
    // Bollywood / Hindi Entertainment Channels
    {
      id: 'colors-tv',
      name: 'Colors TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Popular Hindi serials and reality shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Colors_TV_logo.svg/250px-Colors_TV_logo.svg.png'
    },
    {
      id: 'star-plus',
      name: 'Star Plus',
      category: 'Entertainment', 
      language: 'Hindi',
      description: 'Hindi family entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/d7/StarPlus_Logo.png'
    },
    {
      id: 'zee-tv',
      name: 'Zee TV',
      category: 'Entertainment',
      language: 'Hindi', 
      description: 'Hindi entertainment channel',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Zee_TV_2025.svg/250px-Zee_TV_2025.svg.png'
    },
    {
      id: 'sony-tv',
      name: 'Sony TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Hindi serials and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/SET_India_Logo_%282022%29.png/120px-SET_India_Logo_%282022%29.png'
    },
    {
      id: 'sab-tv',
      name: 'SAB TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Family comedy and entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sony_SAB_Logo_%282022%29.png/120px-Sony_SAB_Logo_%282022%29.png'
    },
    {
      id: 'and-tv',
      name: '& TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Hindi GEC channel by Zee',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/%26TV_2025.svg/250px-%26TV_2025.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/POGO-logo.png/250px-POGO-logo.png'
    },
    {
      id: 'cartoon-network',
      name: 'Cartoon Network',
      category: 'Kids',
      language: 'English',
      description: 'International cartoons and animation',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/250px-Cartoon_Network_2010_logo.svg.png'
    },
    {
      id: 'disney-channel',
      name: 'Disney Channel',
      category: 'Kids', 
      language: 'English',
      description: 'Disney movies and shows for kids',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/2014_Disney_Channel_logo.svg/250px-2014_Disney_Channel_logo.svg.png'
    },
    {
      id: 'nick',
      name: 'Nickelodeon',
      category: 'Kids',
      language: 'English',
      description: 'Nick Jr. shows and cartoons',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nickelodeon_2023_logo_%28outline%29.svg/250px-Nickelodeon_2023_logo_%28outline%29.svg.png'
    },
    {
      id: 'nick-jr',
      name: 'Nick Jr.',
      category: 'Kids',
      language: 'English',
      description: 'Preschool programming',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nick_Jr._logo_2023.svg/250px-Nick_Jr._logo_2023.svg.png'
    },
    {
      id: 'hungama',
      name: 'Hungama TV',
      category: 'Kids',
      language: 'Hindi',
      description: 'Hindi kids entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Hungama_TV.svg/250px-Hungama_TV.svg.png'
    },
    {
      id: 'sonic',
      name: 'Sonic Nickelodeon',
      category: 'Kids',
      language: 'Hindi',
      description: 'Action cartoons for kids',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Nick.svg/250px-Nick.svg.png'
    },
    {
      id: 'disney-junior',
      name: 'Disney Junior',
      category: 'Kids',
      language: 'English',
      description: 'Disney for preschoolers',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/2024_Disney_Jr._Logo.svg/250px-2024_Disney_Jr._Logo.svg.png'
    },
    {
      id: 'disney-xd',
      name: 'Disney XD',
      category: 'Kids',
      language: 'English',
      description: 'Action and adventure for kids',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Disney_XD_-_2015.svg/250px-Disney_XD_-_2015.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Star_maa_logo_2023.png/250px-Star_maa_logo_2023.png'
    },
    {
      id: 'mtv',
      name: 'MTV India',
      category: 'Music',
      language: 'Hindi',
      description: 'Hindi music videos and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/MTV_2021_%28brand_version%29.svg/250px-MTV_2021_%28brand_version%29.svg.png'
    },
    {
      id: 'vh1',
      name: 'VH1 India',
      category: 'Music',
      language: 'English',
      description: 'International music and pop culture',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/VH1_India_2016.svg/250px-VH1_India_2016.svg.png'
    },
    {
      id: '9xm',
      name: '9XM',
      category: 'Music',
      language: 'Hindi',
      description: 'Bollywood music channel',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/9XMHindiMusicTelevisionChannelLogo.jpg'
    },
    {
      id: 'b4u-music',
      name: 'B4U Music',
      category: 'Music',
      language: 'Hindi',
      description: 'Non-stop Bollywood music',
      logo: 'https://static.wikia.nocookie.net/logopedia/images/8/89/B4U_Music.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/6/61/Bhakthi_TV_logo.jpg'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/SVBCTVLogo.png/250px-SVBCTVLogo.png'
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