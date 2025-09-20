import { useState } from "react";
import { Play, Radio, Tv, Users, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
      viewerCount: '45K'
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
      viewerCount: '32K'
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
      viewerCount: '28K'
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
      viewerCount: '22K'
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
      viewerCount: '15K'
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
      viewerCount: '18K'
    },
    
    // Entertainment Channels
    {
      id: 'star-maa',
      name: 'Star Maa',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu entertainment with serials and movies'
    },
    {
      id: 'zee-telugu',
      name: 'Zee Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Family entertainment with Telugu serials'
    },
    {
      id: 'gemini-tv',
      name: 'Gemini TV',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Telugu entertainment by Sun Network'
    },
    {
      id: 'etv-telugu',
      name: 'ETV Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu serials and shows'
    },
    {
      id: 'colors-telugu',
      name: 'Colors Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Contemporary Telugu entertainment'
    },
    
    // Movie Channels
    {
      id: 'star-maa-movies',
      name: 'Star Maa Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Latest Telugu blockbuster movies'
    },
    {
      id: 'zee-cinemalu',
      name: 'Zee Cinemalu',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movies 24/7'
    },
    {
      id: 'gemini-movies',
      name: 'Gemini Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu cinema entertainment'
    },
    {
      id: 'etv-cinema',
      name: 'ETV Cinema',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movie channel'
    },
    
    // Kids & Music
    {
      id: 'chutti-tv',
      name: 'Chutti TV',
      category: 'Kids',
      language: 'Telugu',
      description: 'Kids entertainment and cartoons'
    },
    {
      id: 'maa-music',
      name: 'Maa Music',
      category: 'Music',
      language: 'Telugu',
      description: 'Telugu music videos and songs'
    },
    
    // Devotional
    {
      id: 'bhakti-tv',
      name: 'Bhakti TV',
      category: 'Devotional',
      language: 'Telugu',
      description: 'Spiritual and devotional content'
    },
    {
      id: 'svbc-tth',
      name: 'SVBC TTD',
      category: 'Devotional',
      language: 'Telugu',
      description: 'Tirumala spiritual channel'
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
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Telugu TV Channels
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Watch your favorite Telugu channels live and free
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
        <div className="text-center">
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
          <span className="text-xs text-muted-foreground">{channel.language}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {channel.description}
        </p>
      </div>
    </Card>
  );
};

export default TeluguChannels;