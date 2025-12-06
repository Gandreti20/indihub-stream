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
  category: 'action' | 'drama' | 'romance' | 'comedy' | 'thriller';
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
