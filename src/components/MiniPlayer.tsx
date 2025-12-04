import { useState } from "react";
import { X, Maximize2, Minimize2, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MiniPlayerProps {
  channel: {
    name: string;
    youtubeEmbedId: string;
    viewerCount?: string;
  };
  onClose: () => void;
  onExpand: () => void;
}

const MiniPlayer = ({ channel, onClose, onExpand }: MiniPlayerProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg shadow-2xl p-3 flex items-center gap-3 animate-in slide-in-from-bottom-4">
        <Badge variant="secondary" className="bg-accent text-accent-foreground animate-pulse">
          <Radio className="h-2 w-2 mr-1" />
          LIVE
        </Badge>
        <span className="text-sm font-medium text-foreground truncate max-w-32">
          {channel.name}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(false)}
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-destructive"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96 bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-background/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant="secondary" className="bg-accent text-accent-foreground animate-pulse shrink-0">
            <Radio className="h-2 w-2 mr-1" />
            LIVE
          </Badge>
          <span className="text-sm font-medium text-foreground truncate">
            {channel.name}
          </span>
          {channel.viewerCount && (
            <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
              <Users className="h-3 w-3" />
              {channel.viewerCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(true)}
            title="Minimize"
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onExpand}
            title="Expand"
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-destructive"
            onClick={onClose}
            title="Close"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Video */}
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${channel.youtubeEmbedId}?autoplay=1&mute=0`}
          title={channel.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default MiniPlayer;
