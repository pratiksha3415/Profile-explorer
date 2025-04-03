
import { useRef, useEffect, useState } from "react";
import { useProfiles, Profile, GeoLocation } from "@/context/ProfileContext";

interface GoogleMapProps {
  selectedProfile?: Profile | null;
  onMarkerClick?: (profileId: string) => void;
  center?: GeoLocation;
  zoom?: number;
}

const GoogleMap = ({ 
  selectedProfile = null, 
  onMarkerClick,
  center,
  zoom = 5
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { profiles } = useProfiles();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<Record<string, google.maps.Marker>>({});

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || map) return;

    const initialCenter = center || { lat: 39.8283, lng: -98.5795 }; // Center of the US
    
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: zoom,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });
    
    setMap(mapInstance);
  }, [mapRef, map, center, zoom]);

  // Update markers when profiles change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    Object.values(markers).forEach(marker => marker.setMap(null));
    const newMarkers: Record<string, google.maps.Marker> = {};

    // Add new markers for each profile
    profiles.forEach(profile => {
      if (!profile.location) return;
      
      const marker = new google.maps.Marker({
        position: profile.location,
        map: map,
        title: profile.name,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: selectedProfile?.id === profile.id ? '#3b82f6' : '#2563eb',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        }
      });

      // Add click event
      marker.addListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(profile.id);
        }
      });

      newMarkers[profile.id] = marker;
    });

    setMarkers(newMarkers);

    // Cleanup function
    return () => {
      Object.values(newMarkers).forEach(marker => marker.setMap(null));
    };
  }, [map, profiles, selectedProfile, onMarkerClick]);

  // Center map on selected profile
  useEffect(() => {
    if (!map || !selectedProfile || !selectedProfile.location) return;
    
    map.panTo(selectedProfile.location);
    map.setZoom(14);
    
    // Bounce animation for selected marker
    const marker = markers[selectedProfile.id];
    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 1500);
    }
  }, [map, selectedProfile, markers]);

  return <div ref={mapRef} className="map-container rounded-md"></div>;
};

export default GoogleMap;
