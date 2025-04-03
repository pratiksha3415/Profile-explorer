
import { useProfiles } from "@/context/ProfileContext";
import ProfileList from "@/components/profile/ProfileList";
import GoogleMap from "@/components/map/GoogleMap";

const Home = () => {
  const { profiles, selectedProfileId, setSelectedProfileId } = useProfiles();
  
  const selectedProfile = profiles.find(profile => profile.id === selectedProfileId);
  
  const handleMarkerClick = (profileId: string) => {
    setSelectedProfileId(profileId);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Explore Profiles</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          <ProfileList />
        </div>
        
        <div className="order-1 lg:order-2 h-[400px] lg:h-[calc(100vh-200px)] sticky top-6">
          <GoogleMap 
            selectedProfile={selectedProfile} 
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
