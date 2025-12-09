const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  rating: number;
  genre: string;
  description: string;
  thumbnail: string;
  backdrop?: string;
  category: 'action' | 'drama' | 'romance' | 'comedy' | 'thriller';
}

export interface MovieDetails extends Movie {
  tagline?: string;
  runtime?: number;
  cast: { id: number; name: string; character: string; profile_path: string | null }[];
  director?: string;
  watchProviders: {
    flatrate?: { provider_id: number; provider_name: string; logo_path: string }[];
    rent?: { provider_id: number; provider_name: string; logo_path: string }[];
    buy?: { provider_id: number; provider_name: string; logo_path: string }[];
    link?: string;
  };
}

// Genre mapping from TMDb IDs to categories
const genreToCategory: Record<number, Movie['category']> = {
  28: 'action',     // Action
  12: 'action',     // Adventure
  16: 'action',     // Animation
  35: 'comedy',     // Comedy
  80: 'thriller',   // Crime
  99: 'drama',      // Documentary
  18: 'drama',      // Drama
  10751: 'drama',   // Family
  14: 'action',     // Fantasy
  36: 'drama',      // History
  27: 'thriller',   // Horror
  10402: 'drama',   // Music
  9648: 'thriller', // Mystery
  10749: 'romance', // Romance
  878: 'thriller',  // Science Fiction
  10770: 'drama',   // TV Movie
  53: 'thriller',   // Thriller
  10752: 'action',  // War
  37: 'action',     // Western
};

const genreNames: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export const getPosterUrl = (path: string | null, size: 'w342' | 'w500' | 'original' = 'w500'): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w780' | 'w1280' | 'original' = 'w780'): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

const convertTMDBToMovie = (tmdbMovie: TMDBMovie): Movie => {
  const primaryGenreId = tmdbMovie.genre_ids[0] || 18;
  const category = genreToCategory[primaryGenreId] || 'drama';
  const genreName = genreNames[primaryGenreId] || 'Drama';
  
  return {
    id: tmdbMovie.id.toString(),
    title: tmdbMovie.title,
    year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 2020,
    duration: '120 min', // TMDb doesn't provide duration in discovery endpoints
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    genre: genreName,
    description: tmdbMovie.overview || 'No description available',
    thumbnail: getPosterUrl(tmdbMovie.poster_path),
    category,
  };
};

export const discoverTeluguMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=te-IN&with_original_language=te&sort_by=popularity.desc&page=${page}&vote_count.gte=10&primary_release_date.gte=2000-01-01`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies from TMDb');
    }
    
    const data = await response.json();
    return data.results.map(convertTMDBToMovie);
  } catch (error) {
    console.error('Error fetching Telugu movies:', error);
    return [];
  }
};

export const discoverTeluguMoviesMultiplePages = async (pageCount: number = 5): Promise<Movie[]> => {
  try {
    const pagePromises = Array.from({ length: pageCount }, (_, i) => discoverTeluguMovies(i + 1));
    const results = await Promise.all(pagePromises);
    return results.flat();
  } catch (error) {
    console.error('Error fetching multiple pages of Telugu movies:', error);
    return [];
  }
};

export const searchTeluguMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=te-IN&query=${encodeURIComponent(query)}&page=${page}&with_original_language=te`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search movies from TMDb');
    }
    
    const data = await response.json();
    return data.results
      .filter((movie: TMDBMovie) => movie.original_language === 'te')
      .map(convertTMDBToMovie);
  } catch (error) {
    console.error('Error searching Telugu movies:', error);
    return [];
  }
};

export const getMoviesByCategory = async (category: Movie['category'], page: number = 1): Promise<Movie[]> => {
  const genreIds = Object.entries(genreToCategory)
    .filter(([_, cat]) => cat === category)
    .map(([id]) => id)
    .join(',');
  
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=te-IN&with_original_language=te&with_genres=${genreIds}&sort_by=popularity.desc&page=${page}&vote_count.gte=10&primary_release_date.gte=2000-01-01`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies by category from TMDb');
    }
    
    const data = await response.json();
    return data.results.map(convertTMDBToMovie);
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    return [];
  }
};

export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies from TMDb');
    }
    
    const data = await response.json();
    return data.results.map(convertTMDBToMovie).slice(0, 20);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const getPopularTeluguMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=te-IN&with_original_language=te&sort_by=vote_average.desc&vote_count.gte=50&page=${page}&primary_release_date.gte=2000-01-01`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies from TMDb');
    }
    
    const data = await response.json();
    return data.results.map(convertTMDBToMovie);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getMovieVideos = async (movieId: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie videos from TMDb');
    }
    
    const data = await response.json();
    
    // Prioritize trailers, then teasers, then any video
    const trailer = data.results.find((video: any) => 
      video.site === 'YouTube' && video.type === 'Trailer'
    );
    const teaser = data.results.find((video: any) => 
      video.site === 'YouTube' && video.type === 'Teaser'
    );
    const anyVideo = data.results.find((video: any) => video.site === 'YouTube');
    
    return trailer?.key || teaser?.key || anyVideo?.key || null;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return null;
  }
};

export const getMovieDetails = async (movieId: string): Promise<MovieDetails | null> => {
  try {
    // Fetch movie details, credits, and watch providers in parallel
    const [detailsRes, creditsRes, providersRes] = await Promise.all([
      fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`),
      fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`),
      fetch(`${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`)
    ]);

    if (!detailsRes.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const details = await detailsRes.json();
    const credits = creditsRes.ok ? await creditsRes.json() : { cast: [], crew: [] };
    const providers = providersRes.ok ? await providersRes.json() : { results: {} };

    // Get India watch providers (IN) or fallback to US
    const regionProviders = providers.results?.IN || providers.results?.US || {};

    const primaryGenreId = details.genres?.[0]?.id || 18;
    const category = genreToCategory[primaryGenreId] || 'drama';
    const genreName = details.genres?.map((g: any) => g.name).join(', ') || 'Drama';

    const director = credits.crew?.find((c: any) => c.job === 'Director')?.name;

    return {
      id: details.id.toString(),
      title: details.title,
      year: details.release_date ? new Date(details.release_date).getFullYear() : 2020,
      duration: details.runtime ? `${details.runtime} min` : 'N/A',
      runtime: details.runtime,
      rating: Math.round(details.vote_average * 10) / 10,
      genre: genreName,
      description: details.overview || 'No description available',
      tagline: details.tagline,
      thumbnail: getPosterUrl(details.poster_path),
      backdrop: getBackdropUrl(details.backdrop_path, 'original'),
      category,
      cast: credits.cast?.slice(0, 10).map((c: any) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profile_path: c.profile_path
      })) || [],
      director,
      watchProviders: {
        flatrate: regionProviders.flatrate || [],
        rent: regionProviders.rent || [],
        buy: regionProviders.buy || [],
        link: regionProviders.link
      }
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getProviderLogoUrl = (path: string): string => {
  return `${TMDB_IMAGE_BASE_URL}/w92${path}`;
};

export const getProfileUrl = (path: string | null): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/w185${path}`;
};

// OTT Provider IDs for India region
export const OTT_PROVIDERS = {
  netflix: { id: 8, name: 'Netflix', logo: '/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg' },
  prime: { id: 119, name: 'Amazon Prime Video', logo: '/emthp39XA2YScoYL1p0sdbAH2WA.jpg' },
  hotstar: { id: 122, name: 'Hotstar', logo: '/7Fl8ylPDclt3ZYgNbW2t7rbZE9I.jpg' },
  zee5: { id: 232, name: 'ZEE5', logo: '/xEPXbwbfABMB9fXqnqnmTpPzGh4.jpg' },
  sonyliv: { id: 237, name: 'SonyLIV', logo: '/lKN0cXQpKrhK4ZeMYTF7yozLn9c.jpg' },
  jiocinema: { id: 220, name: 'JioCinema', logo: '/lQK4eeBNK7lLoHBZJKr8cQDCl0f.jpg' },
  aha: { id: 532, name: 'Aha', logo: '/5SxDM7kVr8vmZxPMlaBPVVu5mHB.jpg' },
} as const;

export type OTTProviderKey = keyof typeof OTT_PROVIDERS;

export const discoverTeluguMoviesByProvider = async (providerId: number, page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=te-IN&with_original_language=te&sort_by=popularity.desc&page=${page}&vote_count.gte=10&primary_release_date.gte=2000-01-01&watch_region=IN&with_watch_providers=${providerId}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies by provider from TMDb');
    }
    
    const data = await response.json();
    return data.results.map(convertTMDBToMovie);
  } catch (error) {
    console.error('Error fetching movies by provider:', error);
    return [];
  }
};

export const discoverTeluguMoviesByProviderMultiplePages = async (providerId: number, pageCount: number = 5): Promise<Movie[]> => {
  try {
    const pagePromises = Array.from({ length: pageCount }, (_, i) => discoverTeluguMoviesByProvider(providerId, i + 1));
    const results = await Promise.all(pagePromises);
    return results.flat();
  } catch (error) {
    console.error('Error fetching multiple pages by provider:', error);
    return [];
  }
};

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export const getMovieWatchProviders = async (movieId: string): Promise<WatchProvider[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    const regionProviders = data.results?.IN || data.results?.US || {};
    
    // Combine flatrate (streaming) providers, prioritize them
    const providers: WatchProvider[] = [];
    const seenIds = new Set<number>();
    
    const addProviders = (list: WatchProvider[] | undefined) => {
      if (!list) return;
      for (const p of list) {
        if (!seenIds.has(p.provider_id)) {
          seenIds.add(p.provider_id);
          providers.push(p);
        }
      }
    };
    
    addProviders(regionProviders.flatrate);
    addProviders(regionProviders.rent);
    addProviders(regionProviders.buy);
    
    return providers.slice(0, 4); // Max 4 providers
  } catch (error) {
    console.error('Error fetching watch providers:', error);
    return [];
  }
};
