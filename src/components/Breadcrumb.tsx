import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Breadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    if (path === "/") {
      return [{ label: "Home", path: "/" }];
    }
    
    if (path === "/telugu-channels") {
      return [
        { label: "Home", path: "/" },
        { label: "All Channels", path: "/telugu-channels" }
      ];
    }
    
    if (path === "/movies") {
      return [
        { label: "Home", path: "/" },
        { label: "Free Movies", path: "/movies" }
      ];
    }
    
    return [{ label: "Home", path: "/" }];
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground py-4 px-4">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          {index === 0 && <Home className="h-4 w-4 mr-2" />}
          {index < breadcrumbs.length - 1 ? (
            <Link to={crumb.path}>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                {crumb.label}
              </Button>
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;