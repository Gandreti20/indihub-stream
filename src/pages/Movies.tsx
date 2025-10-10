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
  category: 'action' | 'drama' | 'romance' | 'comedy' | 'thriller';
}

const freeMovies: Movie[] = [
  {
    id: '1',
    title: 'Crazy Fellow',
    year: 2024,
    duration: '145 min',
    rating: 7.2,
    genre: 'Comedy',
    description: 'Love blooms on a dating app when conversations between two people take an unexpected turn.',
    videoId: 'bklpgXjeWkQ',
    thumbnail: 'https://img.youtube.com/vi/bklpgXjeWkQ/maxresdefault.jpg',
    category: 'comedy'
  },
  {
    id: '2',
    title: 'Dheera',
    year: 2024,
    duration: '138 min',
    rating: 7.3,
    genre: 'Action',
    description: 'An action-packed thriller featuring Laksh Chadalavada in an intense performance.',
    videoId: 'AwB5CW5io9U',
    thumbnail: 'https://img.youtube.com/vi/AwB5CW5io9U/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '3',
    title: 'Kajal Karthika',
    year: 2023,
    duration: '130 min',
    rating: 7.0,
    genre: 'Drama',
    description: 'Featuring Kajal Aggarwal and Regina Cassandra in a compelling drama.',
    videoId: 'pgjPpp-vqdY',
    thumbnail: 'https://img.youtube.com/vi/pgjPpp-vqdY/maxresdefault.jpg',
    category: 'drama'
  },
  {
    id: '4',
    title: 'A (Ad Infinitum)',
    year: 2023,
    duration: '142 min',
    rating: 7.5,
    genre: 'Thriller',
    description: 'A mysterious person seeks his past in an increasingly convoluted quest spanning decades involving science, crime, and politics.',
    videoId: 'Xo84bb0qz5E',
    thumbnail: 'https://img.youtube.com/vi/Xo84bb0qz5E/maxresdefault.jpg',
    category: 'thriller'
  },
  {
    id: '5',
    title: 'Kadambari',
    year: 2024,
    duration: '125 min',
    rating: 6.8,
    genre: 'Thriller',
    description: 'While watching cricket, an ardent fan observes paranormal activity in his house.',
    videoId: 'QjtJakiEHKA',
    thumbnail: 'https://img.youtube.com/vi/QjtJakiEHKA/maxresdefault.jpg',
    category: 'thriller'
  },
  {
    id: '6',
    title: 'Ragala 24 Gantallo',
    year: 2023,
    duration: '148 min',
    rating: 7.1,
    genre: 'Thriller',
    description: 'Vidya is happily married until mysterious events unfold in just 24 hours.',
    videoId: '3DY7zBmgEXk',
    thumbnail: 'https://img.youtube.com/vi/3DY7zBmgEXk/maxresdefault.jpg',
    category: 'thriller'
  },
  {
    id: '7',
    title: 'Ramam Raghavam',
    year: 2023,
    duration: '135 min',
    rating: 7.4,
    genre: 'Drama',
    description: 'A powerful drama starring Samuthirakani and Harish Uthaman.',
    videoId: 'tf_E_ZIeWVo',
    thumbnail: 'https://img.youtube.com/vi/tf_E_ZIeWVo/maxresdefault.jpg',
    category: 'drama'
  },
  {
    id: '8',
    title: 'Masakali',
    year: 2023,
    duration: '128 min',
    rating: 6.9,
    genre: 'Drama',
    description: 'A heartwarming Telugu drama with English subtitles.',
    videoId: 'CChK7nI3RRk',
    thumbnail: 'https://img.youtube.com/vi/CChK7nI3RRk/maxresdefault.jpg',
    category: 'drama'
  },
  {
    id: '9',
    title: 'Raghavendra',
    year: 2003,
    duration: '155 min',
    rating: 7.2,
    genre: 'Action',
    description: 'Prabhas stars in this action-packed entertainer.',
    videoId: 'TDoA-7LqIuE',
    thumbnail: 'https://img.youtube.com/vi/TDoA-7LqIuE/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '10',
    title: 'UTSAVAM',
    year: 2023,
    duration: '140 min',
    rating: 7.3,
    genre: 'Drama',
    description: 'Featuring Dilip Prakash, Regina Cassandra, Rajendra Prasad, and Prakash Raj.',
    videoId: 'as0XMR9vyhg',
    thumbnail: 'https://img.youtube.com/vi/as0XMR9vyhg/maxresdefault.jpg',
    category: 'drama'
  },
  {
    id: '11',
    title: 'Yevam',
    year: 2023,
    duration: '132 min',
    rating: 7.0,
    genre: 'Thriller',
    description: 'Starring Chandini Chowdary in a gripping thriller.',
    videoId: '-YysWb4qtGs',
    thumbnail: 'https://img.youtube.com/vi/-YysWb4qtGs/maxresdefault.jpg',
    category: 'thriller'
  },
  {
    id: '12',
    title: 'Nuvvostanante Nenoddantana',
    year: 2005,
    duration: '165 min',
    rating: 8.1,
    genre: 'Romance',
    description: 'Siddharth and Trisha star in this romantic classic directed by Prabhu Deva.',
    videoId: 'c_diMSAaojU',
    thumbnail: 'https://img.youtube.com/vi/c_diMSAaojU/maxresdefault.jpg',
    category: 'romance'
  },
  {
    id: '13',
    title: 'Jaffa',
    year: 2013,
    duration: '138 min',
    rating: 6.5,
    genre: 'Comedy',
    description: 'Brahmanandam delivers a super hit comedy entertainer.',
    videoId: 'slmWiYT6LU0',
    thumbnail: 'https://img.youtube.com/vi/slmWiYT6LU0/maxresdefault.jpg',
    category: 'comedy'
  },
  {
    id: '14',
    title: 'Tagore',
    year: 2003,
    duration: '175 min',
    rating: 7.8,
    genre: 'Action',
    description: 'Megastar Chiranjeevi stars in this action-packed drama with Shriya Saran.',
    videoId: 'h9164Uo55As',
    thumbnail: 'https://img.youtube.com/vi/h9164Uo55As/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '15',
    title: 'RRR',
    year: 2022,
    duration: '187 min',
    rating: 7.8,
    genre: 'Action',
    description: 'A tale of two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.',
    videoId: 'GY4CDmUdo3A',
    thumbnail: 'https://img.youtube.com/vi/GY4CDmUdo3A/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '16',
    title: 'Pushpa: The Rise',
    year: 2021,
    duration: '179 min',
    rating: 7.6,
    genre: 'Action',
    description: 'A laborer named Pushpa makes enemies as he rises in the world of red sandalwood smuggling.',
    videoId: 'pKctjEKHXkk',
    thumbnail: 'https://img.youtube.com/vi/pKctjEKHXkk/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '17',
    title: 'Baahubali 2',
    year: 2017,
    duration: '167 min',
    rating: 8.0,
    genre: 'Action',
    description: 'Amarendra Baahubali fights for his kingdom after learning about his heritage.',
    videoId: 'wZZ_nniRFIE',
    thumbnail: 'https://img.youtube.com/vi/wZZ_nniRFIE/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '18',
    title: 'Arjun Reddy',
    year: 2017,
    duration: '182 min',
    rating: 8.1,
    genre: 'Drama',
    description: 'A short-tempered house surgeon gets used to drugs and drinks when his girlfriend is forced to marry another person.',
    videoId: 'j-5_VzXzQ44',
    thumbnail: 'https://img.youtube.com/vi/j-5_VzXzQ44/maxresdefault.jpg',
    category: 'drama'
  },
  {
    id: '19',
    title: 'Ala Vaikunthapurramuloo',
    year: 2020,
    duration: '165 min',
    rating: 7.3,
    genre: 'Drama',
    description: 'After growing up enduring criticism from his father, a young man finds his world shaken upon learning he was switched at birth.',
    videoId: 'C_qhF38ob0o',
    thumbnail: 'https://img.youtube.com/vi/C_qhF38ob0o/maxresdefault.jpg',
    category: 'drama'
  },
  {
    id: '20',
    title: 'Rangasthalam',
    year: 2018,
    duration: '179 min',
    rating: 8.2,
    genre: 'Action',
    description: 'A hearing impaired guy joins forces with his elder brother to overthrow their village president.',
    videoId: '8CjJLZCUBe0',
    thumbnail: 'https://img.youtube.com/vi/8CjJLZCUBe0/maxresdefault.jpg',
    category: 'action'
  },
  {
    id: '21',
    title: 'Magadheera',
    year: 2009,
    duration: '155 min',
    rating: 7.7,
    genre: 'Romance',
    description: 'A warrior gets reincarnated 400 years later to win back his love and save the kingdom.',
    videoId: 'YcWaDN0NJLc',
    thumbnail: 'https://img.youtube.com/vi/YcWaDN0NJLc/maxresdefault.jpg',
    category: 'romance'
  },
  {
    id: '22',
    title: 'Eega',
    year: 2012,
    duration: '134 min',
    rating: 7.7,
    genre: 'Thriller',
    description: 'A young man is murdered and reincarnated as a housefly to seek revenge.',
    videoId: 'lEOOZDbMrgE',
    thumbnail: 'https://img.youtube.com/vi/lEOOZDbMrgE/maxresdefault.jpg',
    category: 'thriller'
  }
];

const Movies = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const categories = [
    { id: 'all', label: 'All Movies' },
    { id: 'action', label: 'Action' },
    { id: 'drama', label: 'Drama' },
    { id: 'romance', label: 'Romance' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'comedy', label: 'Comedy' }
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Telugu Movies</h1>
            <p className="text-muted-foreground">Watch popular Telugu blockbuster movies and trailers</p>
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
            className="text-xs bg-secondary/80 text-secondary-foreground capitalize"
          >
            {movie.category}
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