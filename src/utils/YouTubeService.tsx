interface YouTubePlayerConfig {
  videoId: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
}

export class YouTubeService {
  private static API_KEY_STORAGE_KEY = 'youtube_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('YouTube API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static extractVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  static generateEmbedUrl(videoId: string, autoplay: boolean = false): string {
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', '1');
    params.append('modestbranding', '1');
    params.append('rel', '0');
    
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  static async getVideoInfo(videoId: string): Promise<any> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('YouTube API key not found');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch video info');
      }

      const data = await response.json();
      return data.items?.[0] || null;
    } catch (error) {
      console.error('Error fetching video info:', error);
      throw error;
    }
  }

  static async searchChannelVideos(channelId: string, maxResults: number = 10): Promise<any[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('YouTube API key not found');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&key=${apiKey}&part=snippet&type=video&eventType=live&maxResults=${maxResults}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search channel videos');
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error searching channel videos:', error);
      throw error;
    }
  }
}

export const YouTubePlayer = ({ 
  videoUrl, 
  width = 800, 
  height = 450, 
  autoplay = false 
}: { 
  videoUrl: string; 
  width?: number; 
  height?: number; 
  autoplay?: boolean; 
}) => {
  const videoId = YouTubeService.extractVideoId(videoUrl);
  
  if (!videoId) {
    return (
      <div className="flex items-center justify-center bg-black text-white p-8 rounded-lg">
        <p>Invalid YouTube URL</p>
      </div>
    );
  }

  const embedUrl = YouTubeService.generateEmbedUrl(videoId, autoplay);

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Live Stream"
      />
    </div>
  );
};