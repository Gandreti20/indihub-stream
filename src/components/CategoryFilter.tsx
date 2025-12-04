import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

const CategoryFilter = () => {
  const location = useLocation();
  
  const categories = [
    { name: 'All', path: '/' },
    { name: 'Movies', count: '2.5K', path: '/movies' },
    { name: 'TV Shows', count: '850', path: '/telugu-channels' },
    { name: 'Live TV', count: '200+', path: '/telugu-channels' },
    { name: 'Categories', count: '6', path: '/channel-categories' },
    { name: 'Sports', count: '45', path: '/telugu-channels' },
    { name: 'News', count: '30', path: '/telugu-channels' },
    { name: 'Kids', count: '120', path: '/' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    return false;
  };


  return (
    <section className="border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container px-4 py-4">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link key={category.name} to={category.path}>
              <Button
                variant={isActive(category.path) ? "default" : "ghost"}
                size="sm"
                className={`whitespace-nowrap ${isActive(category.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:text-primary'}`}
              >
                {category.name}
                {category.count && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default CategoryFilter;