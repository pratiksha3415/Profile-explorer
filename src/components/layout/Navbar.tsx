
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Settings, Home } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Geo Profile Explorer
          </span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`flex items-center ${isActive("/") 
              ? "text-primary font-medium" 
              : "text-gray-600 hover:text-primary"} transition-colors duration-200`}
          >
            <Home className="mr-1 h-4 w-4" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/home" 
            className={`flex items-center ${isActive("/home") 
              ? "text-primary font-medium" 
              : "text-gray-600 hover:text-primary"} transition-colors duration-200`}
          >
            <Users className="mr-1 h-4 w-4" />
            <span>Profiles</span>
          </Link>
          
          <Link to="/admin">
            <Button 
              variant={isActive("/admin") ? "default" : "outline"} 
              size="sm" 
              className="flex items-center animate-hover-bounce"
            >
              <Settings className={`mr-1 h-4 w-4 ${isActive("/admin") ? "animate-pulse-gentle" : ""}`} />
              <span>Admin</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
