import { useState, useRef, useEffect, useCallback } from "react";
import { X, Maximize2, Minimize2, Radio, Users, Volume2, VolumeX, GripVertical, Pin, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Channel {
  id: string;
  name: string;
  youtubeEmbedId?: string;
  viewerCount?: string;
  isYouTubeLive?: boolean;
}

interface MiniPlayerProps {
  channel: Channel;
  allChannels?: Channel[];
  onClose: () => void;
  onExpand: () => void;
  onChannelChange?: (channel: Channel) => void;
}

const STORAGE_KEY = "mini-player-settings";

const MiniPlayer = ({ channel, allChannels = [], onClose, onExpand, onChannelChange }: MiniPlayerProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [alwaysOnTop, setAlwaysOnTop] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).alwaysOnTop ?? true : true;
  });
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).position ?? { x: 0, y: 0 } : { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  // Filter channels that have YouTube live streams
  const liveChannels = allChannels.filter(ch => ch.isYouTubeLive && ch.youtubeEmbedId);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ position, alwaysOnTop }));
  }, [position, alwaysOnTop]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    
    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault();
        // Space toggles mute (play/pause not possible with YouTube embed)
        setIsMuted(prev => !prev);
        break;
      case 'm':
        setIsMuted(prev => !prev);
        break;
      case 'arrowup':
        e.preventDefault();
        setVolume(prev => Math.min(100, prev + 10));
        setIsMuted(false);
        break;
      case 'arrowdown':
        e.preventDefault();
        setVolume(prev => Math.max(0, prev - 10));
        break;
      case 'escape':
        setIsMinimized(true);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, select, [role="combobox"]')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleChannelSwitch = (channelId: string) => {
    const newChannel = liveChannels.find(ch => ch.id === channelId);
    if (newChannel && onChannelChange) {
      onChannelChange(newChannel);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Calculate iframe src with volume/mute parameters
  const iframeSrc = `https://www.youtube.com/embed/${channel.youtubeEmbedId}?autoplay=1&mute=${isMuted ? 1 : 0}`;

  const zIndexClass = alwaysOnTop ? "z-[9999]" : "z-50";

  if (isMinimized) {
    return (
      <div 
        ref={dragRef}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className={`fixed bottom-4 right-4 ${zIndexClass} bg-card border border-border rounded-lg shadow-2xl p-3 flex items-center gap-3 animate-in slide-in-from-bottom-4 cursor-move`}
        onMouseDown={handleMouseDown}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
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
    <TooltipProvider>
      <div 
        ref={dragRef}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className={`fixed bottom-4 right-4 ${zIndexClass} w-80 md:w-96 bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4`}
      >
      {/* Header - Draggable */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-background/80 backdrop-blur border-b border-border cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
          <Badge variant="secondary" className="bg-accent text-accent-foreground animate-pulse shrink-0">
            <Radio className="h-2 w-2 mr-1" />
            LIVE
          </Badge>
          {channel.viewerCount && (
            <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
              <Users className="h-3 w-3" />
              {channel.viewerCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${alwaysOnTop ? 'text-primary' : ''}`}
                onClick={() => setAlwaysOnTop(!alwaysOnTop)}
              >
                <Pin className={`h-3 w-3 ${alwaysOnTop ? 'fill-current' : ''}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{alwaysOnTop ? 'Unpin from top' : 'Always on top'}</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(true)}
            title="Minimize (Esc)"
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

      {/* Channel Selector */}
      {liveChannels.length > 1 && (
        <div className="px-3 py-2 bg-background/60 border-b border-border">
          <Select value={channel.id} onValueChange={handleChannelSwitch}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Switch channel" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {liveChannels.map((ch) => (
                <SelectItem key={ch.id} value={ch.id} className="text-xs">
                  {ch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Video */}
      <div className="aspect-video">
        <iframe
          key={`${channel.youtubeEmbedId}-${isMuted}`}
          width="100%"
          height="100%"
          src={iframeSrc}
          title={channel.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 px-3 py-2 bg-background/80 border-t border-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{isMuted ? "Unmute (M)" : "Mute (M)"}</p>
            </TooltipContent>
          </Tooltip>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8 text-right">
            {isMuted ? 0 : volume}%
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Keyboard className="h-3 w-3 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              <div className="space-y-1">
                <p><kbd className="px-1 bg-muted rounded">Space</kbd> / <kbd className="px-1 bg-muted rounded">M</kbd> Mute</p>
                <p><kbd className="px-1 bg-muted rounded">↑</kbd> / <kbd className="px-1 bg-muted rounded">↓</kbd> Volume</p>
                <p><kbd className="px-1 bg-muted rounded">Esc</kbd> Minimize</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MiniPlayer;
