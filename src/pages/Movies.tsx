import { useState } from 'react';
import { Play, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StreamingHeader from "@/components/StreamingHeader";
import NavigationBreadcrumb from "@/components/Breadcrumb";

interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  rating: number;
  genre: string;
  description: string;
  videoId: string;
  thumbnail: string;
  category: 'bollywood' | 'hollywood' | 'public-domain' | 'documentary';
}

const freeMovies: Movie[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    year: 2008,
    duration: '10 min',
    rating: 6.8,
    genre: 'Animation',
    description: 'A large and lovable rabbit deals with three tiny bullies in this short comedy.',
    videoId: 'aqz-KE-bpKQ',
    thumbnail: 'https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg',
    category: 'public-domain'
  },
  {
    id: '2', 
    title: 'Sintel',
    year: 2010,
    duration: '15 min',
    rating: 7.4,
    genre: 'Fantasy',
    description: 'A lonely young woman, Sintel, helps and befriends a dragon.',
    videoId: 'eRsGyueVLvQ',
    thumbnail: 'https://img.youtube.com/vi/eRsGyueVLvQ/maxresdefault.jpg',
    category: 'public-domain'
  },
  {
    id: '3',
    title: 'Elephants Dream',
    year: 2006,
    duration: '11 min',
    rating: 6.5,
    genre: 'Sci-Fi',
    description: 'The story of two strange characters exploring a capricious and seemingly infinite machine.',
    videoId: 'TLkA0RELQ1g',
    thumbnail: 'https://img.youtube.com/vi/TLkA0RELQ1g/maxresdefault.jpg',
    category: 'public-domain'
  },
  {
    id: '4',
    title: 'Tears of Steel',
    year: 2012,
    duration: '12 min',
    rating: 6.9,
    genre: 'Sci-Fi',
    description: 'A futuristic sci-fi short film about a group of warriors and scientists.',
    videoId: 'R6MlUcmOul8',
    thumbnail: 'https://img.youtube.com/vi/R6MlUcmOul8/maxresdefault.jpg',
    category: 'public-domain'
  },
  {
    id: '5',
    title: 'Cosmos Laundromat',
    year: 2015,
    duration: '12 min',
    rating: 7.3,
    genre: 'Fantasy',
    description: 'On a desolate island, a suicidal sheep named Franck meets his fate in a quirky salesman.',
    videoId: 'Y-rmzh0PI3c',
    thumbnail: 'https://img.youtube.com/vi/Y-rmzh0PI3c/maxresdefault.jpg',
    category: 'hollywood'
  },
  {
    id: '6',
    title: 'Spring',
    year: 2019,
    duration: '7 min',
    rating: 7.2,
    genre: 'Animation',
    description: 'A young woman struggles with depression during her first year at Harvard.',
    videoId: 'WhWc3b3KhnY',
    thumbnail: 'https://img.youtube.com/vi/WhWc3b3KhnY/maxresdefault.jpg',
    category: 'hollywood'
  }
];

const Movies = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const categories = [
    { id: 'all', label: 'All Movies' },
    { id: 'public-domain', label: 'Classic Films' },
    { id: 'hollywood', label: 'Hollywood' },
    { id: 'documentary', label: 'Documentaries' }
  ];

  const filteredMovies = selectedCategory === 'all' 
    ? freeMovies 
    : freeMovies.filter(movie => movie.category === selectedCategory);


  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader />
      
      <main className="pt-20">
        <div className="container px-4 py-6">
          <NavigationBreadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Free Movies</h1>
            <p className="text-muted-foreground">Watch classic public domain films and free content</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
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

          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onPlay={setSelectedMovie} />
            ))}
          </div>
        </div>
      </main>

      {/* Movie Player Dialog */}
      <Dialog open={!!selectedMovie} onOpenChange={(open) => !open && setSelectedMovie(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          {selectedMovie && (
            <div className="flex-1 flex flex-col">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMovie.videoId}?autoplay=1`}
                  title={selectedMovie.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
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
    </div>
  );
};

const MovieCard = ({ movie, onPlay }: { movie: Movie; onPlay: (movie: Movie) => void }) => {
  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
      <div className="aspect-[2/3] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundImage: `url(${movie.thumbnail})`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="default" 
            size="sm" 
            className="gap-2 bg-primary/90 hover:bg-primary"
            onClick={() => onPlay(movie)}
          >
            <Play className="h-4 w-4" />
            Play
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
            className="text-xs bg-secondary/80 text-secondary-foreground"
          >
            {movie.category === 'public-domain' ? 'Classic' : movie.category}
          </Badge>
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