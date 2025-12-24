import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Play, ExternalLink, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import StreamingHeader from '@/components/StreamingHeader';
import { 
  getMovieDetails, 
  getMovieVideos, 
  getProviderLogoUrl, 
  getProfileUrl,
  getSimilarMovies,
  MovieDetails,
  Movie
} from '@/services/tmdb';

// OTT Platform deep links mapping
const OTT_LINKS: Record<number, { name: string; baseUrl: string; color: string }> = {
  8: { name: 'Netflix', baseUrl: 'https://www.netflix.com/title/', color: 'bg-red-600 hover:bg-red-700' },
  119: { name: 'Amazon Prime', baseUrl: 'https://www.primevideo.com/detail/', color: 'bg-blue-500 hover:bg-blue-600' },
  122: { name: 'Hotstar', baseUrl: 'https://www.hotstar.com/in/', color: 'bg-blue-700 hover:bg-blue-800' },
  337: { name: 'Disney+', baseUrl: 'https://www.disneyplus.com/movies/', color: 'bg-purple-600 hover:bg-purple-700' },
  350: { name: 'Apple TV+', baseUrl: 'https://tv.apple.com/movie/', color: 'bg-gray-700 hover:bg-gray-800' },
  531: { name: 'Paramount+', baseUrl: 'https://www.paramountplus.com/movies/', color: 'bg-blue-600 hover:bg-blue-700' },
  237: { name: 'Zee5', baseUrl: 'https://www.zee5.com/movies/details/', color: 'bg-purple-500 hover:bg-purple-600' },
  220: { name: 'JioCinema', baseUrl: 'https://www.jiocinema.com/movies/', color: 'bg-pink-600 hover:bg-pink-700' },
  232: { name: 'SonyLIV', baseUrl: 'https://www.sonyliv.com/movies/', color: 'bg-blue-800 hover:bg-blue-900' },
  121: { name: 'Aha', baseUrl: 'https://www.aha.video/movie/', color: 'bg-yellow-500 hover:bg-yellow-600' },
  584: { name: 'MX Player', baseUrl: 'https://www.mxplayer.in/movie/', color: 'bg-teal-600 hover:bg-teal-700' },
};

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;
      
      setLoading(true);
      try {
        const [details, videoKey, similar] = await Promise.all([
          getMovieDetails(movieId),
          getMovieVideos(movieId),
          getSimilarMovies(movieId)
        ]);
        setMovie(details);
        setTrailerKey(videoKey);
        setSimilarMovies(similar);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const getAllProviders = () => {
    if (!movie?.watchProviders) return [];
    
    const providers = new Map<number, { provider_id: number; provider_name: string; logo_path: string; type: string }>();
    
    movie.watchProviders.flatrate?.forEach(p => {
      if (!providers.has(p.provider_id)) {
        providers.set(p.provider_id, { ...p, type: 'Stream' });
      }
    });
    
    movie.watchProviders.rent?.forEach(p => {
      if (!providers.has(p.provider_id)) {
        providers.set(p.provider_id, { ...p, type: 'Rent' });
      }
    });
    
    movie.watchProviders.buy?.forEach(p => {
      if (!providers.has(p.provider_id)) {
        providers.set(p.provider_id, { ...p, type: 'Buy' });
      }
    });
    
    return Array.from(providers.values());
  };

  const handleProviderClick = (providerId: number, providerName: string) => {
    const ottInfo = OTT_LINKS[providerId];
    
    // If we have a direct link from TMDB, use that
    if (movie?.watchProviders.link) {
      window.open(movie.watchProviders.link, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Otherwise try to construct a link or search on Google
    if (ottInfo) {
      // Try a search on the platform
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${movie?.title} ${movie?.year} site:${ottInfo.baseUrl.replace('https://', '').split('/')[0]}`)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Generic search
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${movie?.title} ${movie?.year} watch ${providerName}`)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative h-[50vh]">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-64 h-96 rounded-xl" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie not found</h1>
          <Button onClick={() => navigate('/movies')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Movies
          </Button>
        </div>
      </div>
    );
  }

  const providers = getAllProviders();

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      
      {/* Backdrop */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
        
        {/* Back button */}
        <Button
          variant="ghost"
          className="absolute top-6 left-6 z-20 bg-background/50 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-64 h-auto rounded-xl shadow-2xl border-2 border-primary/20"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg text-muted-foreground italic">"{movie.tagline}"</p>
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
              <Badge variant="secondary">{movie.genre}</Badge>
            </div>

            {/* Director */}
            {movie.director && (
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Directed by:</span> {movie.director}
              </p>
            )}

            {/* Description */}
            <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl">
              {movie.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {trailerKey && (
                <Link to={`/trailer/${movie.id}/${encodeURIComponent(movie.title)}`}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Watch Trailer
                  </Button>
                </Link>
              )}
            </div>

            {/* Watch on OTT Platforms */}
            {providers.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-xl font-semibold text-foreground">Watch Now</h3>
                <div className="flex flex-wrap gap-3">
                  {providers.map((provider) => {
                    const ottInfo = OTT_LINKS[provider.provider_id];
                    return (
                      <Button
                        key={provider.provider_id}
                        onClick={() => handleProviderClick(provider.provider_id, provider.provider_name)}
                        className={`${ottInfo?.color || 'bg-primary hover:bg-primary/90'} gap-2`}
                      >
                        <img
                          src={getProviderLogoUrl(provider.logo_path)}
                          alt={provider.provider_name}
                          className="w-6 h-6 rounded"
                        />
                        {provider.provider_name}
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Streaming availability may vary by region. Click to check on the platform.
                </p>
              </div>
            )}

            {providers.length === 0 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-xl font-semibold text-foreground">Where to Watch</h3>
                <p className="text-muted-foreground">
                  No streaming information available for this movie in your region.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://www.justwatch.com/in/search?q=${encodeURIComponent(movie.title)}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Check on JustWatch
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {movie.cast.length > 0 && (
          <div className="mt-12 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Cast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.cast.map((actor) => (
                <div 
                  key={actor.id} 
                  className="bg-card rounded-lg p-3 text-center border border-border hover:border-primary/50 transition-colors"
                >
                  {actor.profile_path ? (
                    <img
                      src={getProfileUrl(actor.profile_path)}
                      alt={actor.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto bg-muted flex items-center justify-center mb-3">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <p className="font-medium text-foreground text-sm truncate">{actor.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="mt-12 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">You May Also Like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((similarMovie) => (
                <div 
                  key={similarMovie.id} 
                  className="group cursor-pointer"
                  onClick={() => navigate(`/movie/${similarMovie.id}`)}
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-all">
                    <img
                      src={similarMovie.thumbnail}
                      alt={similarMovie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-sm font-medium truncate">{similarMovie.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <span>{similarMovie.year}</span>
                          <span>⭐ {similarMovie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-foreground font-medium truncate group-hover:text-primary transition-colors">
                    {similarMovie.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default MovieDetail;
