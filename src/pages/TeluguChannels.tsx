import { useState } from "react";
import { Play, Radio, Tv, Users, X, Volume2 } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import NavigationBreadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Channel {
  id: string;
  name: string;
  category: 'News' | 'Entertainment' | 'Movies' | 'Kids' | 'Music' | 'Sports' | 'Devotional';
  isLive?: boolean;
  isYouTubeLive?: boolean;
  youtubeEmbedId?: string;
  language: string;
  description: string;
  viewerCount?: string;
  logo?: string;
}

const TeluguChannels = () => {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

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
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/TV9_Telugu.svg/200px-TV9_Telugu.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/ABN_Andhra_Jyothi_logo.svg/200px-ABN_Andhra_Jyothi_logo.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a6/V6_News_logo.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/TV5_News_logo.svg/200px-TV5_News_logo.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/10TV_logo.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/NTV_Telugu_logo.svg/200px-NTV_Telugu_logo.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Sakshi_TV_logo.svg/200px-Sakshi_TV_logo.svg.png'
    },
    
    // Entertainment Channels
    {
      id: 'star-maa',
      name: 'Star Maa',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu entertainment with serials and movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Star_Maa.svg/200px-Star_Maa.svg.png'
    },
    {
      id: 'zee-telugu',
      name: 'Zee Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Family entertainment with Telugu serials',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Zee_Telugu_Logo.svg/200px-Zee_Telugu_Logo.svg.png'
    },
    {
      id: 'gemini-tv',
      name: 'Gemini TV',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Telugu entertainment by Sun Network',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Gemini_TV_logo.svg/200px-Gemini_TV_logo.svg.png'
    },
    {
      id: 'etv-telugu',
      name: 'ETV Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu serials and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/ETV_Telugu_logo.svg/200px-ETV_Telugu_logo.svg.png'
    },
    {
      id: 'colors-telugu',
      name: 'Colors Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Contemporary Telugu entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Colors_Telugu.svg/200px-Colors_Telugu.svg.png'
    },
    
    // Movie Channels
    {
      id: 'star-maa-movies',
      name: 'Star Maa Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Latest Telugu blockbuster movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Star_Maa_Movies.svg/200px-Star_Maa_Movies.svg.png'
    },
    {
      id: 'zee-cinemalu',
      name: 'Zee Cinemalu',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movies 24/7',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Zee_Cinemalu_Logo.svg/200px-Zee_Cinemalu_Logo.svg.png'
    },
    {
      id: 'gemini-movies',
      name: 'Gemini Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu cinema entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Gemini_Movies_logo.svg/200px-Gemini_Movies_logo.svg.png'
    },
    {
      id: 'etv-cinema',
      name: 'ETV Cinema',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movie channel',
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/9a/ETV_Cinema_logo.png'
    },
    
    // Hindi Entertainment Channels
    {
      id: 'colors-tv',
      name: 'Colors TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Popular Hindi serials and reality shows',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Colors_TV.svg/200px-Colors_TV.svg.png'
    },
    {
      id: 'star-plus',
      name: 'Star Plus',
      category: 'Entertainment', 
      language: 'Hindi',
      description: 'Hindi family entertainment',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Star_Plus_2018.svg/200px-Star_Plus_2018.svg.png'
    },
    {
      id: 'zee-tv',
      name: 'Zee TV',
      category: 'Entertainment',
      language: 'Hindi', 
      description: 'Hindi entertainment channel',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Zee_TV_Logo.svg/200px-Zee_TV_Logo.svg.png'
    },
    {
      id: 'sony-tv',
      name: 'Sony TV',
      category: 'Entertainment',
      language: 'Hindi',
      description: 'Hindi serials and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Sony_Entertainment_Television_logo.svg/200px-Sony_Entertainment_Television_logo.svg.png'
    },
    
    // Hindi Movies
    {
      id: 'sony-max',
      name: 'Sony Max',
      category: 'Movies',
      language: 'Hindi',
      description: 'Latest Bollywood movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Sony_Max_logo.svg/200px-Sony_Max_logo.svg.png'
    },
    {
      id: 'zee-cinema',
      name: 'Zee Cinema',
      category: 'Movies',
      language: 'Hindi',
      description: 'Hindi blockbuster movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Zee_Cinema_2017.svg/200px-Zee_Cinema_2017.svg.png'
    },
    {
      id: 'star-gold',
      name: 'Star Gold',
      category: 'Movies',
      language: 'Hindi',
      description: 'Classic and new Hindi movies',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Star_Gold_Logo.svg/200px-Star_Gold_Logo.svg.png'
    },
    
    // Kids Channels
    {
      id: 'chutti-tv',
      name: 'Chutti TV',
      category: 'Kids',
      language: 'Tamil',
      description: 'Kids entertainment and cartoons',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Chutti_TV_logo.svg/200px-Chutti_TV_logo.svg.png'
    },
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Pogo_TV_logo.svg/200px-Pogo_TV_logo.svg.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Disney_Channel_2019.svg/200px-Disney_Channel_2019.svg.png'
    },
    {
      id: 'nick',
      name: 'Nickelodeon',
      category: 'Kids',
      language: 'English',
      description: 'Nick Jr. shows and cartoons',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Nickelodeon_2023_logo_%28outline%29.svg/200px-Nickelodeon_2023_logo_%28outline%29.svg.png'
    },
    
    // Sports Channels
    {
      id: 'star-sports-1',
      name: 'Star Sports 1',
      category: 'Sports',
      language: 'Hindi',
      description: 'Live cricket, football and sports',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Star_Sports_2018.svg/200px-Star_Sports_2018.svg.png'
    },
    {
      id: 'sony-sports',
      name: 'Sony Sports Network',
      category: 'Sports',
      language: 'Hindi',
      description: 'Live sports coverage',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Sony_Sports_Network_logo.svg/200px-Sony_Sports_Network_logo.svg.png'
    },
    {
      id: 'dd-sports',
      name: 'DD Sports',
      category: 'Sports',
      isYouTubeLive: true,
      youtubeEmbedId: 'bWL9_DzI16w',
      language: 'Hindi',
      description: 'Free live sports channel',
      viewerCount: '12K',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/DD_Sports_logo.svg/200px-DD_Sports_logo.svg.png'
    },
    {
      id: 'eurosport',
      name: 'Eurosport',
      category: 'Sports',
      language: 'English',
      description: 'International sports coverage',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Eurosport_Logo_2015.svg/200px-Eurosport_Logo_2015.svg.png'
    },
    
    // Music
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/8/82/Maa_Music_logo.png'
    },
    {
      id: 'mtv',
      name: 'MTV India',
      category: 'Music',
      language: 'Hindi',
      description: 'Hindi music videos and shows',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/MTV_Logo.svg/200px-MTV_Logo.svg.png'
    },
    
    // Devotional
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/76/Bhakti_TV_logo.png'
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
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/SVBC_logo.svg/200px-SVBC_logo.svg.png'
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
      logo: 'https://yt3.googleusercontent.com/ytc/AIdro_niQTdBRq6UhNJGPXYEwTa9pA1N-ys2S8eJJMq_3g=s176-c-k-c0x00ffffff-no-rj'
    }
  ];

  const handleChannelClick = (channel: Channel) => {
    if (channel.isYouTubeLive && channel.youtubeEmbedId) {
      setSelectedChannel(channel);
      setIsPlayerOpen(true);
      toast({
        title: `Opening ${channel.name}`,
        description: "Loading live stream...",
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

  const categories = ['All', 'News', 'Entertainment', 'Movies', 'Kids', 'Music', 'Sports', 'Devotional'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredChannels = selectedCategory === 'All' 
    ? channels 
    : channels.filter(channel => channel.category === selectedCategory);

  const liveChannelsCount = channels.filter(c => c.isYouTubeLive).length;

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
              {category}
              {category !== 'All' && (
                <Badge variant="secondary" className="ml-2 text-xs bg-secondary/50">
                  {channels.filter(c => c.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredChannels.map((channel) => (
            <ChannelCard 
              key={channel.id} 
              channel={channel} 
              onClick={() => handleChannelClick(channel)}
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
                <Button variant="ghost" size="sm" onClick={closePlayer}>
                  <X className="h-4 w-4" />
                </Button>
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
      </div>
    </div>
  );
};

const ChannelCard = ({ 
  channel, 
  onClick 
}: { 
  channel: Channel; 
  onClick: () => void; 
}) => {
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

  const isClickable = channel.isYouTubeLive && channel.youtubeEmbedId;

  return (
    <Card 
      className={`group relative overflow-hidden bg-card border transition-all duration-300 ${
        isClickable 
          ? 'cursor-pointer hover:border-primary/50 hover:shadow-lg hover:scale-105' 
          : 'cursor-default opacity-75'
      }`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="aspect-video relative bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        {channel.logo ? (
          <img 
            src={channel.logo} 
            alt={channel.name}
            className="max-h-16 max-w-[80%] object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`text-center ${channel.logo ? 'hidden' : ''}`}>
          <Tv className="h-6 w-6 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-foreground text-sm leading-tight">{channel.name}</h3>
        </div>
        
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
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary" 
            className={`${getCategoryColor(channel.category)} text-white text-xs`}
          >
            {channel.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {channel.description}
        </p>
      </div>
    </Card>
  );
};

export default TeluguChannels;