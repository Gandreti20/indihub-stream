import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, Maximize, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StreamingHeader from "@/components/StreamingHeader";
import { getMovieVideos } from "@/services/tmdb";

const TrailerPlayer = () => {
  const { movieId, title } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!movieId) return;
      setLoading(true);
      const key = await getMovieVideos(movieId);
      setVideoKey(key);
      setLoading(false);
    };
    fetchVideo();
  }, [movieId]);

  const decodedTitle = title ? decodeURIComponent(title) : "Movie Trailer";

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <StreamingHeader />
      
      {/* Top Bar */}
      <div className="absolute top-16 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex-1 text-center">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              Official Trailer
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="absolute inset-0 pt-16 pb-24">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-white/70">Loading trailer...</p>
          </div>
        ) : videoKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${muted ? 1 : 0}&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            title={decodedTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-white">
            <p className="text-xl mb-2">No trailer available</p>
            <p className="text-white/60">Trailer not found for this movie</p>
            <Button
              variant="outline"
              className="mt-4 border-white/20 text-white hover:bg-white/10"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {decodedTitle}
        </h1>
        <p className="text-white/60 text-sm">
          Watch the official trailer • Powered by TMDb
        </p>
      </div>
    </div>
  );
};

export default TrailerPlayer;
