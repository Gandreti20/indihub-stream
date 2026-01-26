export interface Channel {
  id: string;
  name: string;
  category: 'News' | 'Entertainment' | 'Movies' | 'Sports' | 'Kids' | 'Music' | 'Devotional';
  isLive?: boolean;
  isYouTubeLive?: boolean;
  youtubeEmbedId?: string;
  streamUrl?: string;
  language: string;
  description: string;
  viewerCount?: string;
  logo?: string;
}

export interface RecentChannel {
  id: string;
  timestamp: number;
}
