
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfiles } from "@/context/ProfileContext";
import GoogleMap from "@/components/map/GoogleMap";
import ProfileCard from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Mail, Phone, Twitter, Linkedin, Facebook } from "lucide-react";

const ProfileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profiles, setSelectedProfileId } = useProfiles();
  
  const profile = profiles.find(p => p.id === id);
  
  useEffect(() => {
    if (profile) {
      setSelectedProfileId(profile.id);
    }
    
    return () => {
      setSelectedProfileId(null);
    };
  }, [profile, setSelectedProfileId]);
  
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground mb-4">The profile you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profiles
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Profiles
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ProfileCard profile={profile} variant="expanded" />
          
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-3">Details</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Address</h4>
                  <p className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{profile.address}</span>
                  </p>
                </div>
                
                {profile.interests && profile.interests.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.interests.map(interest => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.socials && Object.values(profile.socials).some(Boolean) && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Social Profiles</h4>
                    <div className="flex space-x-3">
                      {profile.socials.twitter && (
                        <a 
                          href={`https://twitter.com/${profile.socials.twitter}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-600"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      
                      {profile.socials.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${profile.socials.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      
                      {profile.socials.facebook && (
                        <a 
                          href={`https://facebook.com/${profile.socials.facebook}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600"
                          aria-label="Facebook"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-3 pt-1">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                  
                  {profile.email && (
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  )}
                  
                  {profile.phone && (
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${profile.phone}`} className="hover:underline">
                        {profile.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="h-[400px] lg:h-[600px]">
          <GoogleMap 
            selectedProfile={profile} 
            center={profile.location}
            zoom={14}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
