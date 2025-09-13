import { RadioIcon, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import liveTvImage from "@/assets/live-tv.jpg";

const LiveTVSection = () => {
  const liveChannels = [
    { 
      id: '1', 
      name: 'Star Sports 1', 
      category: 'Sports', 
      currentShow: 'IPL 2024 - MI vs CSK',
      viewers: '2.3M',
      timeSlot: '7:30 PM - 11:00 PM'
    },
    { 
      id: '2', 
      name: 'Sony Entertainment', 
      category: 'Entertainment', 
      currentShow: 'Kaun Banega Crorepati',
      viewers: '1.8M',
      timeSlot: '9:00 PM - 10:00 PM'
    },
    { 
      id: '3', 
      name: 'Zee News', 
      category: 'News', 
      currentShow: 'Prime Time Debate',
      viewers: '890K',
      timeSlot: '8:00 PM - 9:00 PM'
    },
    { 
      id: '4', 
      name: 'Discovery Kids', 
      category: 'Kids', 
      currentShow: 'Chhota Bheem',
      viewers: '450K',
      timeSlot: '6:00 PM - 7:00 PM'
    },
  ];

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Live TV</h2>
            <p className="text-muted-foreground">Watch live channels from across India</p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Channels
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Live Content */}
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden bg-card border-border">
              <div className="aspect-video relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${liveTvImage})` }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="bg-live-indicator animate-pulse gap-1">
                    <RadioIcon className="h-3 w-3" />
                    LIVE
                  </Badge>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">IPL 2024 - Mumbai Indians vs Chennai Super Kings</h3>
                    <p className="text-gray-200">Star Sports 1 • 2.3M viewers</p>
                    <div className="flex items-center gap-2">
                      <Button variant="hero" size="sm">
                        Watch Live
                      </Button>
                      <Button variant="watchlist" size="sm">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Live Channels List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Currently Airing</h3>
            {liveChannels.map((channel) => (
              <Card key={channel.id} className="p-4 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {channel.category}
                      </Badge>
                      <Badge variant="destructive" className="bg-live-indicator text-xs animate-pulse">
                        LIVE
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground truncate">{channel.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{channel.currentShow}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {channel.viewers}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {channel.timeSlot}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTVSection;