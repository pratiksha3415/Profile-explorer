
import { useState } from "react";
import { useProfiles } from "@/context/ProfileContext";
import ProfileCard from "./ProfileCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";

const ProfileList = () => {
  const { profiles, selectedProfileId, setSelectedProfileId } = useProfiles();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [professionFilter, setProfessionFilter] = useState<string>("");
  
  // Get unique cities and professions for filter options
  const cities = [...new Set(profiles.map(p => p.city).filter(Boolean))];
  const professions = [...new Set(profiles.map(p => p.profession).filter(Boolean))];
  
  // Filter profiles based on search and filters
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = searchQuery ? 
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (profile.profession && profile.profession.toLowerCase().includes(searchQuery.toLowerCase())) :
      true;
      
    const matchesCity = cityFilter ? profile.city === cityFilter : true;
    const matchesProfession = professionFilter ? profile.profession === professionFilter : true;
    
    return matchesSearch && matchesCity && matchesProfession;
  });
  
  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setCityFilter("");
    setProfessionFilter("");
  };
  
  const hasActiveFilters = searchQuery || cityFilter || professionFilter;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search profiles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="city" className="text-xs">City</Label>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger id="city" className="h-9">
                <SelectValue placeholder="Any city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any city</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city!}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="profession" className="text-xs">Profession</Label>
            <Select value={professionFilter} onValueChange={setProfessionFilter}>
              <SelectTrigger id="profession" className="h-9">
                <SelectValue placeholder="Any profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any profession</SelectItem>
                {professions.map(profession => (
                  <SelectItem key={profession} value={profession!}>{profession}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center text-sm">
              <Filter className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">
                {filteredProfiles.length} {filteredProfiles.length === 1 ? 'result' : 'results'}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2">
              <X className="h-3 w-3 mr-1" />
              <span>Clear</span>
            </Button>
          </div>
        )}
      </div>
      
      {filteredProfiles.length > 0 ? (
        <div className="space-y-4 animate-fade-in">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isSelected={profile.id === selectedProfileId}
              onSelect={handleSelectProfile}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No profiles match your criteria.</p>
          <Button variant="link" onClick={clearFilters}>Clear filters</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
