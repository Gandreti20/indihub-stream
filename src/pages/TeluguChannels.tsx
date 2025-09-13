import { useState } from "react";
import { Play, Radio, Tv, Users, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Channel {
  id: string;
  name: string;
  category: 'News' | 'Entertainment' | 'Movies' | 'Kids' | 'Music' | 'Sports' | 'Devotional';
  logo?: string;
  isLive?: boolean;
  isYouTubeLive?: boolean;
  youtubeUrl?: string;
  language: string;
  description: string;
  viewerCount?: string;
}

const TeluguChannels = () => {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [youtubeApiKey, setYoutubeApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);

  const channels: Channel[] = [
    // News Channels
    {
      id: 'tv9-telugu',
      name: 'TV9 Telugu',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=II_m28Bm-iM',
      language: 'Telugu',
      description: '24/7 Telugu news channel covering breaking news, politics, and current affairs',
      viewerCount: '45K'
    },
    {
      id: 'abn-telugu',
      name: 'ABN Telugu',
      category: 'News', 
      isLive: true,
      isYouTubeLive: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=HoYsWagMFfE',
      language: 'Telugu',
      description: 'Andhra Pradesh and Telangana news updates and political coverage',
      viewerCount: '32K'
    },
    {
      id: 'v6-news',
      name: 'V6 News',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=nrb8P8shbDk',
      language: 'Telugu',
      description: 'Telangana-focused news channel with live coverage',
      viewerCount: '28K'
    },
    {
      id: 'tv5-news',
      name: 'TV5 News Telugu',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=LUnp_p497s0',
      language: 'Telugu',
      description: 'Breaking news from Andhra Pradesh and Telangana',
      viewerCount: '22K'
    },
    {
      id: 'etv-news',
      name: 'ETV Andhra Pradesh',
      category: 'News',
      isLive: true,
      language: 'Telugu',
      description: 'Regional news and current affairs for Andhra Pradesh'
    },
    {
      id: '10tv-news',
      name: '10TV News',
      category: 'News',
      isLive: true,
      isYouTubeLive: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=byG7EGw9NPs',
      language: 'Telugu',
      description: 'Telugu news channel with political and social coverage',
      viewerCount: '15K'
    },
    
    // Entertainment Channels
    {
      id: 'star-maa',
      name: 'Star Maa',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Popular Telugu entertainment channel with serials and movies'
    },
    {
      id: 'zee-telugu',
      name: 'Zee Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Family entertainment with Telugu serials and reality shows'
    },
    {
      id: 'gemini-tv',
      name: 'Gemini TV',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Telugu entertainment channel by Sun Network'
    },
    {
      id: 'etv-telugu',
      name: 'ETV Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Long-running Telugu entertainment channel with popular serials'
    },
    {
      id: 'colors-telugu',
      name: 'Colors Telugu',
      category: 'Entertainment',
      language: 'Telugu',
      description: 'Contemporary Telugu entertainment with reality shows'
    },
    
    // Movie Channels
    {
      id: 'star-maa-movies',
      name: 'Star Maa Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Latest and classic Telugu movies'
    },
    {
      id: 'zee-cinemalu',
      name: 'Zee Cinemalu',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movie channel with blockbuster films'
    },
    {
      id: 'gemini-movies',
      name: 'Gemini Movies',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu cinema channel by Sun Network'
    },
    {
      id: 'etv-cinema',
      name: 'ETV Cinema',
      category: 'Movies',
      language: 'Telugu',
      description: 'Telugu movie entertainment'
    },
    
    // Kids Channels
    {
      id: 'chutti-tv',
      name: 'Chutti TV',
      category: 'Kids',
      language: 'Telugu',
      description: 'Tamil kids channel popular among Telugu children'
    },
    {
      id: 'kochu-tv',
      name: 'Kochu TV',
      category: 'Kids',
      language: 'Telugu',
      description: 'Kids entertainment channel'
    },
    
    // Music & Others
    {
      id: 'maa-music',
      name: 'Maa Music',
      category: 'Music',
      language: 'Telugu',
      description: 'Telugu music videos and songs'
    },
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
      description: 'Tirumala Tirupati Devasthanams spiritual channel'
    }
  ];

  const handleChannelClick = (channel: Channel) => {
    if (channel.isYouTubeLive && channel.youtubeUrl) {
      // For YouTube live channels, we need to handle API integration
      if (!youtubeApiKey) {
        setShowApiInput(true);
        setSelectedChannel(channel);
        return;
      }
      // Here you would integrate with YouTube API
      setSelectedChannel(channel);
      toast({
        title: `Opening ${channel.name}`,
        description: "Loading live stream...",
      });
    } else {
      toast({
        title: channel.name,
        description: "This channel requires a subscription or direct TV access",
        variant: "destructive"
      });
    }
  };

  const handleApiKeySubmit = () => {
    if (youtubeApiKey) {
      localStorage.setItem('youtube_api_key', youtubeApiKey);
      setShowApiInput(false);
      toast({
        title: "API Key Saved",
        description: "You can now watch YouTube live channels",
      });
      if (selectedChannel) {
        handleChannelClick(selectedChannel);
      }
    }
  };

  const categories = ['All', 'News', 'Entertainment', 'Movies', 'Kids', 'Music', 'Sports', 'Devotional'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredChannels = selectedCategory === 'All' 
    ? channels 
    : channels.filter(channel => channel.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Telugu TV Channels
          </h1>
          <p className="text-muted-foreground text-lg">
            Watch your favorite Telugu channels - News, Entertainment, Movies & More
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-live-indicator text-white animate-pulse">
              {channels.filter(c => c.isYouTubeLive).length} Live on YouTube
            </Badge>
            <Badge variant="outline">
              {channels.length} Total Channels
            </Badge>
          </div>
        </div>

        {/* API Key Input for YouTube Integration */}
        {showApiInput && (
          <Card className="max-w-md mx-auto mb-8 p-6 bg-secondary/50 border-border">
            <h3 className="text-lg font-semibold mb-4">YouTube API Configuration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To watch live YouTube channels, please provide your YouTube API key. 
              For production use, connect to Supabase to securely store API keys.
            </p>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter YouTube API Key"
                value={youtubeApiKey}
                onChange={(e) => setYoutubeApiKey(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleApiKeySubmit} className="flex-1">
                  Save API Key
                </Button>
                <Button variant="outline" onClick={() => setShowApiInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

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
                <Badge variant="secondary" className="ml-2 text-xs">
                  {channels.filter(c => c.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChannels.map((channel) => (
            <ChannelCard 
              key={channel.id} 
              channel={channel} 
              onClick={() => handleChannelClick(channel)}
            />
          ))}
        </div>

        {/* Selected Channel Player */}
        {selectedChannel && selectedChannel.isYouTubeLive && youtubeApiKey && (
          <Card className="mt-8 p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Now Playing: {selectedChannel.name}</h3>
              <Button variant="outline" size="sm" onClick={() => setSelectedChannel(null)}>
                Close
              </Button>
            </div>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Tv className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Live Stream Player</p>
                <p className="text-sm opacity-75">
                  YouTube embed would be integrated here with API
                </p>
                <Button 
                  variant="hero" 
                  className="mt-4"
                  onClick={() => window.open(selectedChannel.youtubeUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in YouTube
                </Button>
              </div>
            </div>
          </Card>
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
      case 'News': return 'bg-red-500';
      case 'Entertainment': return 'bg-purple-500';
      case 'Movies': return 'bg-blue-500';
      case 'Kids': return 'bg-green-500';
      case 'Music': return 'bg-pink-500';
      case 'Sports': return 'bg-orange-500';
      case 'Devotional': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-glow"
      onClick={onClick}
    >
      <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <div className="text-center p-4">
          <Tv className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold text-foreground text-lg">{channel.name}</h3>
        </div>
        
        {/* Live Indicator */}
        {channel.isLive && (
          <div className="absolute top-2 left-2">
            <Badge 
              variant="destructive" 
              className="bg-live-indicator text-white animate-pulse gap-1"
            >
              <Radio className="h-3 w-3" />
              LIVE
            </Badge>
          </div>
        )}
        
        {/* YouTube Badge */}
        {channel.isYouTubeLive && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-red-600 text-white">
              YouTube
            </Badge>
          </div>
        )}
        
        {/* Viewer Count */}
        {channel.viewerCount && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded text-xs text-white">
            <Users className="h-3 w-3" />
            {channel.viewerCount}
          </div>
        )}
        
        {/* Play Button on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2"
          >
            <Play className="h-5 w-5" />
            Watch Now
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary" 
            className={`${getCategoryColor(channel.category)} text-white text-xs`}
          >
            {channel.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{channel.language}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {channel.description}
        </p>
      </div>
    </Card>
  );
};

export default TeluguChannels;