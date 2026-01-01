export interface Channel {
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

export interface RecentChannel {
  id: string;
  timestamp: number;
}
