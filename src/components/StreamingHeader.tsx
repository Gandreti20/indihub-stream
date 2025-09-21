import { Search, Menu, User, Heart, Bell, Home, Tv, Film, Trophy, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";

const StreamingHeader = () => {
  const location = useLocation();
  
  const isActivePage = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-premium-gradient bg-clip-text text-transparent hover:scale-105 transition-transform">
                StreamHub
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={isActivePage("/") ? "secondary" : "ghost"} 
                className={`flex items-center gap-2 ${isActivePage("/") ? "bg-secondary text-secondary-foreground" : "text-foreground hover:text-primary"}`}
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/telugu-channels">
              <Button 
                variant={isActivePage("/telugu-channels") ? "secondary" : "ghost"}
                className={`flex items-center gap-2 ${isActivePage("/telugu-channels") ? "bg-secondary text-secondary-foreground" : "text-foreground hover:text-primary"}`}
              >
                <Tv className="h-4 w-4" />
                All Channels
              </Button>
            </Link>
            <Link to="/movies">
              <Button 
                variant={isActivePage("/movies") ? "secondary" : "ghost"}
                className={`flex items-center gap-2 ${isActivePage("/movies") ? "bg-secondary text-secondary-foreground" : "text-foreground hover:text-primary"}`}
              >
                <Film className="h-4 w-4" />
                Free Movies
              </Button>
            </Link>
          </nav>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search channels..."
              className="w-48 pl-9 bg-secondary/50 border-border/50"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary sm:hidden">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default StreamingHeader;