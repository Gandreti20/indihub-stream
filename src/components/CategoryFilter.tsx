import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CategoryFilter = () => {
  const categories = [
    { name: 'All', active: true },
    { name: 'Movies', count: '2.5K' },
    { name: 'TV Shows', count: '850' },
    { name: 'Live TV', count: '200+' },
    { name: 'Sports', count: '45' },
    { name: 'News', count: '30' },
    { name: 'Kids', count: '120' },
    { name: 'Regional', count: '1.2K' },
  ];

  const languages = [
    'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  return (
    <section className="border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container px-4 py-4">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.active ? "default" : "ghost"}
              size="sm"
              className={`whitespace-nowrap ${category.active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:text-primary'}`}
            >
              {category.name}
              {category.count && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
        
        {/* Languages */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-sm text-muted-foreground whitespace-nowrap mr-2">Languages:</span>
          {languages.map((language) => (
            <Button
              key={language}
              variant="ghost"
              size="sm"
              className="text-xs whitespace-nowrap text-muted-foreground hover:text-primary"
            >
              {language}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;