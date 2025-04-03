
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, Users, Settings, ArrowRight, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4 py-12">
      <motion.div 
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-primary bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Geo Profile Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
          Explore profiles on an interactive map and discover people around the world.
        </p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button 
            size="lg" 
            onClick={() => navigate('/home')}
            className="group bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300"
          >
            <Map className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Explore Profiles
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/admin')}
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <Settings className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            Admin Panel
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="mr-2 h-5 w-5 text-primary" />
                Interactive Map
              </CardTitle>
              <CardDescription>Visualize profiles geographically</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Explore profiles with dynamic markers on an interactive Google Map.
                Quickly visualize where everyone is located around the world.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto group" onClick={() => navigate('/home')}>
                Explore Map
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Profile Directory
              </CardTitle>
              <CardDescription>Browse detailed profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View detailed profiles with contact information, interests, and location data.
                Connect with people based on shared interests or location.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto group" onClick={() => navigate('/home')}>
                View Profiles
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5 text-green-500" />
                Smart Filtering
              </CardTitle>
              <CardDescription>Find specific profiles easily</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Filter profiles by city, profession, or interests to quickly find
                the profiles that match your specific criteria.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto group" onClick={() => navigate('/home')}>
                Try Filtering
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
