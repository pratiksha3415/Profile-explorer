
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Profile {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  email?: string;
  phone?: string;
  interests?: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  profession?: string;
  city?: string;
  location?: GeoLocation;
}

interface ProfileContextType {
  profiles: Profile[];
  selectedProfileId: string | null;
  loading: boolean;
  error: string | null;
  setSelectedProfileId: (id: string | null) => void;
  addProfile: (profile: Omit<Profile, "id" | "location">) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  searchProfiles: (query: string) => Profile[];
  filterProfiles: (filters: { city?: string; profession?: string }) => Profile[];
  geocodeAddress: (address: string) => Promise<GeoLocation | null>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Sample profile data
const initialProfiles: Profile[] = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "/placeholder.svg",
    description: "Software Developer with 5 years of experience in web technologies.",
    address: "123 Tech Street, San Francisco, CA",
    email: "alex@example.com",
    phone: "555-123-4567",
    interests: ["coding", "hiking", "photography"],
    socials: {
      twitter: "alexj",
      linkedin: "alexjohnson",
    },
    profession: "Software Developer",
    city: "San Francisco",
    location: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: "2",
    name: "Maria Garcia",
    image: "/placeholder.svg",
    description: "Experienced marketing professional specialized in digital campaigns.",
    address: "456 Market Ave, New York, NY",
    email: "maria@example.com",
    phone: "555-987-6543",
    interests: ["marketing", "travel", "cooking"],
    socials: {
      twitter: "mariag",
      linkedin: "mariagarcia",
      facebook: "maria.garcia",
    },
    profession: "Marketing Manager",
    city: "New York",
    location: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "3",
    name: "David Wilson",
    image: "/placeholder.svg",
    description: "Architect with a passion for sustainable design solutions.",
    address: "789 Design Blvd, Chicago, IL",
    email: "david@example.com",
    phone: "555-456-7890",
    interests: ["architecture", "sustainability", "drawing"],
    socials: {
      linkedin: "davidwilson",
    },
    profession: "Architect",
    city: "Chicago",
    location: { lat: 41.8781, lng: -87.6298 }
  },
  {
    id: "4",
    name: "Sarah Lee",
    image: "/placeholder.svg",
    description: "Healthcare professional specializing in patient care and management.",
    address: "101 Medical Drive, Boston, MA",
    email: "sarah@example.com",
    phone: "555-234-5678",
    interests: ["healthcare", "reading", "yoga"],
    socials: {
      linkedin: "sarahlee",
      facebook: "sarah.lee",
    },
    profession: "Nurse Practitioner",
    city: "Boston",
    location: { lat: 42.3601, lng: -71.0589 }
  },
  {
    id: "5",
    name: "James Brown",
    image: "/placeholder.svg",
    description: "Finance analyst with expertise in investment strategies.",
    address: "202 Finance Street, Seattle, WA",
    email: "james@example.com",
    phone: "555-876-5432",
    interests: ["finance", "investing", "running"],
    socials: {
      twitter: "jamesbrown",
      linkedin: "jamesbrown",
    },
    profession: "Financial Analyst",
    city: "Seattle",
    location: { lat: 47.6062, lng: -122.3321 }
  }
];

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock geocoding function - in a real app, this would call Google's Geocoding API
  const geocodeAddress = async (address: string): Promise<GeoLocation | null> => {
    // Simulate API call
    setLoading(true);
    
    try {
      // In a real app, you would make a call to Google's Geocoding API here
      // For now, we'll return random coordinates near the US
      const randomLat = 37 + Math.random() * 10 - 5;
      const randomLng = -95 + Math.random() * 10 - 5;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const location = { lat: randomLat, lng: randomLng };
      return location;
    } catch (err) {
      setError("Failed to geocode address. Please try again.");
      console.error("Geocoding error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addProfile = async (profile: Omit<Profile, "id" | "location">) => {
    setLoading(true);
    try {
      // Generate a simple ID (in a real app, this would be done by the backend)
      const id = Date.now().toString();
      
      // Geocode the address
      const location = await geocodeAddress(profile.address);
      
      // Create new profile with ID and location
      const newProfile: Profile = {
        ...profile,
        id,
        location: location || undefined
      };
      
      setProfiles([...profiles, newProfile]);
      toast({
        title: "Profile Added",
        description: `Successfully added profile for ${profile.name}`,
      });
    } catch (err) {
      setError("Failed to add profile. Please try again.");
      toast({
        title: "Error",
        description: "Failed to add profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: string, profileUpdate: Partial<Profile>) => {
    setLoading(true);
    try {
      // Check if we need to update the location due to address change
      let location = undefined;
      if (profileUpdate.address) {
        location = await geocodeAddress(profileUpdate.address);
      }
      
      // Update the profile
      const updatedProfiles = profiles.map(profile => {
        if (profile.id === id) {
          return {
            ...profile,
            ...profileUpdate,
            location: location || profile.location,
          };
        }
        return profile;
      });
      
      setProfiles(updatedProfiles);
      toast({
        title: "Profile Updated",
        description: "Successfully updated profile",
      });
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    // If the deleted profile was selected, clear the selection
    if (selectedProfileId === id) {
      setSelectedProfileId(null);
    }
    toast({
      title: "Profile Deleted",
      description: "Successfully deleted profile",
    });
  };

  const searchProfiles = (query: string) => {
    if (!query.trim()) return profiles;
    
    const lowercaseQuery = query.toLowerCase();
    return profiles.filter(profile => {
      return (
        profile.name.toLowerCase().includes(lowercaseQuery) ||
        profile.description.toLowerCase().includes(lowercaseQuery) ||
        profile.address.toLowerCase().includes(lowercaseQuery) ||
        profile.profession?.toLowerCase().includes(lowercaseQuery) ||
        profile.city?.toLowerCase().includes(lowercaseQuery) ||
        profile.interests?.some(interest => interest.toLowerCase().includes(lowercaseQuery))
      );
    });
  };

  const filterProfiles = (filters: { city?: string; profession?: string }) => {
    return profiles.filter(profile => {
      let match = true;
      
      if (filters.city && profile.city) {
        match = match && profile.city.toLowerCase() === filters.city.toLowerCase();
      }
      
      if (filters.profession && profile.profession) {
        match = match && profile.profession.toLowerCase() === filters.profession.toLowerCase();
      }
      
      return match;
    });
  };

  const value = {
    profiles,
    selectedProfileId,
    loading,
    error,
    setSelectedProfileId,
    addProfile,
    updateProfile,
    deleteProfile,
    searchProfiles,
    filterProfiles,
    geocodeAddress,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfileProvider");
  }
  return context;
};
