// src/app/geo-nepal/page.server.ts - this runs on the server to fetch the data
import { getApprovedLocations } from '../lib/locationService';
import { Location, NEPAL_BOUNDS } from '@/app/data/geo-nepal/geo-data';

// This function runs on the server to pre-fetch approved locations
export async function getServerSideData() {
  // Get approved locations from MongoDB
  const approvedLocations = await getApprovedLocations();
  
  // Combine with official locations if needed
  // You can choose to only use user-submitted locations or combine with official ones
  const allLocations: Location[] = [
    ...approvedLocations 
  ];
  
  // Return the locations and bounds for the game
  return {
    locations: allLocations,
    bounds: NEPAL_BOUNDS
  };
}