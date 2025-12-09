import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Clock, Calendar, Loader2, Search, ChevronDown, Info, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StreamingHeader from "@/components/StreamingHeader";
import NavigationBreadcrumb from "@/components/Breadcrumb";
import { discoverTeluguMoviesMultiplePages, discoverTeluguMovies, getMoviesByCategory, searchTeluguMovies, getMovieVideos, discoverTeluguMoviesByProviderMultiplePages, discoverTeluguMoviesByProvider, OTT_PROVIDERS, getProviderLogoUrl, getMovieWatchProviders, type Movie, type OTTProviderKey, type WatchProvider } from "@/services/tmdb";

const currentYear = new Date().getFullYear();
const yearRanges = [
  { id: 'all', label: 'All Years', start: 2000, end: currentYear },
  { id: '2020s', label: '2020-Present', start: 2020, end: currentYear },
  { id: '2015-2019', label: '2015-2019', start: 2015, end: 2019 },
  { id: '2010-2014', label: '2010-2014', start: 2010, end: 2014 },
  { id: '2005-2009', label: '2005-2009', start: 2005, end: 2009 },
  { id: '2000-2004', label: '2000-2004', start: 2000, end: 2004 },
];


const Movies = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYearRange, setSelectedYearRange] = useState<string>('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [currentPage, setCurrentPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [availabilityMovie, setAvailabilityMovie] = useState<Movie | null>(null);
  const [availabilityProviders, setAvailabilityProviders] = useState<WatchProvider[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const categories = [
    { id: 'all', label: 'All Movies' },
    { id: 'action', label: 'Action' },
    { id: 'drama', label: 'Drama' },
    { id: 'romance', label: 'Romance' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'comedy', label: 'Comedy' }
  ];

  // Filter movies by year range
  const filteredMovies = movies.filter(movie => {
    const yearRange = yearRanges.find(r => r.id === selectedYearRange);
    if (!yearRange || selectedYearRange === 'all') return true;
    return movie.year >= yearRange.start && movie.year <= yearRange.end;
  });

  const fetchMovies = async (isBackgroundRefresh = false) => {
    if (!isBackgroundRefresh) {
      setLoading(true);
      setCurrentPage(10);
      setHasMore(true);
    }
    try {
      let data;
      if (searchQuery.trim()) {
        data = await searchTeluguMovies(searchQuery);
        setHasMore(false);
      } else if (selectedCategory === 'all') {
        data = await discoverTeluguMoviesMultiplePages(10);
      } else {
        data = await getMoviesByCategory(selectedCategory as Movie['category']);
      }
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      if (!isBackgroundRefresh) {
        setLoading(false);
      }
    }
  };

  const checkAvailability = async (movie: Movie) => {
    setAvailabilityMovie(movie);
    setLoadingAvailability(true);
    setAvailabilityProviders([]);
    const providers = await getMovieWatchProviders(movie.id);
    setAvailabilityProviders(providers);
    setLoadingAvailability(false);
  };

  // Initial fetch and on filter changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery]);

  // Auto-refresh every 5 minutes to stay synced with TMDB
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchMovies(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [selectedCategory, searchQuery]);

  const loadMoreMovies = async () => {
    if (loadingMore || !hasMore || searchQuery.trim()) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const newMovies = await discoverTeluguMovies(nextPage);
      
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleMovieSelect = async (movie: Movie) => {
    setSelectedMovie(movie);
    setVideoKey(null);
    setLoadingVideo(true);
    
    const key = await getMovieVideos(movie.id);
    setVideoKey(key);
    setLoadingVideo(false);
  };


  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      
      <main className="pt-20">
        <div className="container px-4 py-6">
          <NavigationBreadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Telugu Movies</h1>
            <p className="text-muted-foreground">Watch popular Telugu blockbuster movies and trailers</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Telugu movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Year Range Filter */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Year:</span>
              <Select value={selectedYearRange} onValueChange={setSelectedYearRange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {yearRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="text-sm text-muted-foreground">
              Showing {filteredMovies.length} movies
            </span>
          </div>

          {/* Movies Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No movies found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onPlay={handleMovieSelect}
                    onDetails={(id) => navigate(`/movie/${id}`)}
                    onCheckAvailability={checkAvailability}
                  />
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMore && !searchQuery.trim() && selectedCategory === 'all' && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMoreMovies}
                    disabled={loadingMore}
                    className="gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Load More Movies
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Movie Player Dialog */}
      <Dialog open={!!selectedMovie} onOpenChange={(open) => !open && setSelectedMovie(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          {selectedMovie && (
            <div className="flex-1 flex flex-col">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                {loadingVideo ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : videoKey ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    title={selectedMovie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={selectedMovie.thumbnail} 
                      alt={selectedMovie.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-4">{selectedMovie.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMovie.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMovie.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    <span className="text-sm">{selectedMovie.rating}/10</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {selectedMovie.genre}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Check Availability Dialog */}
      <Dialog open={!!availabilityMovie} onOpenChange={(open) => !open && setAvailabilityMovie(null)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tv className="h-5 w-5 text-primary" />
              Where to Watch
            </DialogTitle>
          </DialogHeader>
          {availabilityMovie && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                  src={availabilityMovie.thumbnail} 
                  alt={availabilityMovie.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{availabilityMovie.title}</h3>
                  <p className="text-sm text-muted-foreground">{availabilityMovie.year} • {availabilityMovie.genre}</p>
                </div>
              </div>
              
              {loadingAvailability ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : availabilityProviders.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Available on these platforms in your region:</p>
                  <div className="flex flex-wrap gap-3">
                    {availabilityProviders.map((provider) => (
                      <div 
                        key={provider.provider_id}
                        className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg"
                      >
                        <img
                          src={getProviderLogoUrl(provider.logo_path)}
                          alt={provider.provider_name}
                          className="w-8 h-8 rounded"
                        />
                        <span className="text-sm font-medium text-foreground">{provider.provider_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No streaming info available for your region.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.open(`https://www.justwatch.com/in/search?q=${encodeURIComponent(availabilityMovie.title)}`, '_blank')}
                  >
                    Check on JustWatch
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onDetails: (movieId: string) => void;
  onCheckAvailability: (movie: Movie) => void;
}

const MovieCard = ({ movie, onPlay, onDetails, onCheckAvailability }: MovieCardProps) => {
  const [providers, setProviders] = useState<WatchProvider[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchProviders = async () => {
      const data = await getMovieWatchProviders(movie.id);
      if (!cancelled) {
        setProviders(data);
      }
    };
    fetchProviders();
    return () => { cancelled = true; };
  }, [movie.id]);

  return (
    <Card 
      className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
      onClick={() => onDetails(movie.id)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundImage: `url(${movie.thumbnail})`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Buttons on hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1 bg-primary/90 hover:bg-primary"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(movie);
            }}
          >
            <Play className="h-4 w-4" />
            Trailer
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onDetails(movie.id);
            }}
          >
            <Info className="h-4 w-4" />
            Details
          </Button>
        </div>
        
        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
          <Star className="h-3 w-3 text-accent fill-accent" />
          <span className="text-xs text-white font-medium">{movie.rating}</span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            variant="secondary"
            className="text-xs bg-secondary/80 text-secondary-foreground capitalize"
          >
            {movie.category}
          </Badge>
        </div>

        {/* OTT Provider Badges + Check Availability */}
        <div 
          className="absolute bottom-2 left-2 right-2 flex items-center gap-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onCheckAvailability(movie);
          }}
          title="Check Availability"
        >
          {providers.length > 0 ? (
            <>
              {providers.slice(0, 3).map((provider) => (
                <img
                  key={provider.provider_id}
                  src={getProviderLogoUrl(provider.logo_path)}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                  className="w-6 h-6 rounded shadow-md"
                />
              ))}
              {providers.length > 3 && (
                <span className="text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">
                  +{providers.length - 3}
                </span>
              )}
            </>
          ) : (
            <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded text-xs text-white">
              <Tv className="h-3 w-3" />
              <span>Check</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm text-foreground truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
        </div>
      </div>
    </Card>
  );
};

export default Movies;