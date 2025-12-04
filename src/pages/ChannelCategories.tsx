import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Star, TrendingUp, Tv, Radio, Sparkles } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import NavigationBreadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Import logos
import tv9Logo from "@/assets/channels/tv9-telugu-logo.png";
import abnLogo from "@/assets/channels/abn-telugu-logo.png";
import starMaaLogo from "@/assets/channels/star-maa-logo.png";
import zeeLogo from "@/assets/channels/zee-telugu-logo.png";
import etvLogo from "@/assets/channels/etv-telugu-logo.png";
import cnLogo from "@/assets/channels/cartoon-network-logo.png";
import starSportsLogo from "@/assets/channels/star-sports-logo.png";

interface FeaturedChannel {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  isLive?: boolean;
  viewers?: string;
}

const ChannelCategories = () => {
  const featuredChannels: FeaturedChannel[] = [
    { id: 'tv9-telugu', name: 'TV9 Telugu', category: 'News', logo: tv9Logo, description: '#1 Telugu News Channel', isLive: true, viewers: '45K' },
    { id: 'star-maa', name: 'Star Maa', category: 'Entertainment', logo: starMaaLogo, description: 'Top Telugu Entertainment' },
    { id: 'etv-telugu', name: 'ETV Telugu', category: 'Entertainment', logo: etvLogo, description: 'Popular Serials & Shows' },
    { id: 'abn-telugu', name: 'ABN Telugu', category: 'News', logo: abnLogo, description: 'Breaking News 24/7', isLive: true, viewers: '32K' },
  ];

  const recommendedChannels: FeaturedChannel[] = [
    { id: 'zee-telugu', name: 'Zee Telugu', category: 'Entertainment', logo: zeeLogo, description: 'Family Entertainment' },
    { id: 'cartoon-network', name: 'Cartoon Network', category: 'Kids', logo: cnLogo, description: 'Fun for Kids' },
    { id: 'star-sports', name: 'Star Sports', category: 'Sports', logo: starSportsLogo, description: 'Live Sports Action' },
  ];

  const categoryCards = [
    { name: 'News', icon: Radio, count: 7, color: 'from-red-500 to-red-700', description: 'Breaking news & live coverage' },
    { name: 'Entertainment', icon: Tv, count: 9, color: 'from-purple-500 to-purple-700', description: 'Serials, shows & more' },
    { name: 'Movies', icon: Play, count: 7, color: 'from-blue-500 to-blue-700', description: 'Telugu & Hindi movies' },
    { name: 'Kids', icon: Sparkles, count: 5, color: 'from-green-500 to-green-700', description: 'Cartoons & kids shows' },
    { name: 'Sports', icon: TrendingUp, count: 4, color: 'from-orange-500 to-orange-700', description: 'Live sports coverage' },
    { name: 'Music', icon: Star, count: 2, color: 'from-pink-500 to-pink-700', description: 'Music videos & songs' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      <NavigationBreadcrumb />
      
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Channel Categories
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore channels by category or browse our recommendations
          </p>
        </div>

        {/* Featured Channels */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold text-foreground">Featured Channels</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredChannels.map((channel) => (
              <Link key={channel.id} to="/telugu-channels">
                <Card className="group relative overflow-hidden bg-card border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-4">
                    <img 
                      src={channel.logo} 
                      alt={channel.name}
                      className="max-h-16 max-w-[80%] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    {channel.isLive && (
                      <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground animate-pulse gap-1">
                        <Radio className="h-2 w-2" />
                        LIVE
                      </Badge>
                    )}
                    {channel.viewers && (
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        {channel.viewers} watching
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-foreground">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Tv className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((category) => (
              <Link key={category.name} to="/telugu-channels">
                <Card className={`group relative overflow-hidden bg-gradient-to-br ${category.color} border-0 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <div className="p-6 text-center text-white">
                    <category.icon className="h-10 w-10 mx-auto mb-3 opacity-90" />
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-80 mb-2">{category.count} channels</p>
                    <p className="text-xs opacity-70">{category.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendedChannels.map((channel) => (
              <Link key={channel.id} to="/telugu-channels">
                <Card className="group flex items-center gap-4 p-4 bg-card border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={channel.logo} 
                      alt={channel.name}
                      className="max-h-10 max-w-[80%] object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{channel.category}</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link to="/telugu-channels">
            <Button size="lg" className="gap-2">
              <Tv className="h-4 w-4" />
              View All Channels
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelCategories;
