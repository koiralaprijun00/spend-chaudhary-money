// app/api/geo-nepal/locations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getApprovedLocations, getLocationById } from '../../../lib/locationService';
import { OFFICIAL_LOCATIONS, NEPAL_BOUNDS } from '@/app/data/geo-nepal/geo-data';

// GET all locations for the game
// Update the GET function
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // If ID is provided, return just that specific location
    if (id) {
      // First check if it's in the official locations
      const officialLocation = OFFICIAL_LOCATIONS.find(loc => loc.id.toString() === id);
      if (officialLocation) {
        return NextResponse.json({ location: officialLocation });
      }
      
      // Otherwise, look in MongoDB
      const location = await getLocationById(id);
      if (!location) {
        return NextResponse.json({ error: 'Location not found' }, { status: 404 });
      }
      
      return NextResponse.json({ location });
    }
    
    // Use official locations as fallback if database times out
    try {
      // Get approved locations from MongoDB with a timeout
      const approvedLocationsPromise = getApprovedLocations();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      );
      
      const approvedLocations = await Promise.race([
        approvedLocationsPromise,
        timeoutPromise
      ]) as any[];
      
      // Combine with official locations
      const allLocations = [
        ...OFFICIAL_LOCATIONS,
        ...approvedLocations
      ];
      
      return NextResponse.json({ 
        locations: allLocations,
        bounds: NEPAL_BOUNDS
      });
    } catch (error) {
      console.error('Error connecting to database, using official locations only:', error);
      // Fall back to just using the official locations
      return NextResponse.json({ 
        locations: OFFICIAL_LOCATIONS,
        bounds: NEPAL_BOUNDS
      });
    }
  } catch (error) {
    console.error('Error in GET locations for game:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}