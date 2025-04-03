
import { Profile } from "@/context/ProfileContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProfileCardProps {
  profile: Profile;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  variant?: "compact" | "expanded";
  index?: number;
}

const ProfileCard = ({ 
  profile, 
  isSelected = false, 
  onSelect,
  variant = "compact",
  index = 0
}: ProfileCardProps) => {
  const { id, name, image, description, address, email, phone, profession, city } = profile;
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1, // Staggered animation based on index
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        className={`${isSelected ? 'border-primary ring-2 ring-primary/20' : 'hover:shadow-md'} 
                   transition-all duration-200`}
        onClick={handleSelect}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-1 flex-1">
              <h3 className="font-medium text-lg">{name}</h3>
              {profession && (
                <p className="text-sm text-muted-foreground">{profession}</p>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                <span className="truncate">{city || address}</span>
              </div>
            </div>
          </div>
          
          {variant === "expanded" && (
            <motion.div 
              className="mt-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm">{description}</p>
              
              {email && (
                <div className="flex items-center text-sm">
                  <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span>{email}</span>
                </div>
              )}
              
              {phone && (
                <div className="flex items-center text-sm">
                  <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span>{phone}</span>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
          {variant === "compact" ? (
            <>
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
              <Link to={`/profile/${id}`}>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="ml-2 shrink-0 group hover:bg-primary/10 transition-colors duration-200"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </>
          ) : (
            <Link to={`/profile/${id}`} className="w-full">
              <Button 
                variant="outline" 
                className="w-full bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-primary/5 hover:to-primary/5 transition-all duration-300"
              >
                <span>View Full Profile</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
