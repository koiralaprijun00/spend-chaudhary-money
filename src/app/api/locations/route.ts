// app/api/locations/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { Location } from '../../data/geo-nepal/geo-data';

// Sample data (replace with actual data fetching logic)
// Export this so it can be imported by the geo-admin API
export const pendingLocations = [
  { id: '1', name: 'Location 1', status: 'pending', submittedAt: '2025-01-01T10:00:00Z' },
  { id: '2', name: 'Location 2', status: 'approved', submittedAt: '2025-01-02T10:00:00Z' },
  { id: '3', name: 'Location 3', status: 'rejected', submittedAt: '2025-01-03T10:00:00Z' },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'pending'; // Default to 'pending'

  // Filter locations based on status
  const filteredLocations = pendingLocations.filter(loc => loc.status === status);

  // Return filtered locations
  return NextResponse.json({ locations: filteredLocations });
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'lat', 'lng', 'imageUrl', 'funFact'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate coordinates
    if (data.lat < -90 || data.lat > 90) {
      return NextResponse.json(
        { error: 'Latitude must be between -90 and 90' },
        { status: 400 }
      );
    }
    
    if (data.lng < -180 || data.lng > 180) {
      return NextResponse.json(
        { error: 'Longitude must be between -180 and 180' },
        { status: 400 }
      );
    }
    
    // Create a new location with a unique ID
    const newLocation = {
      id: uuidv4(),
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      imageUrl: data.imageUrl,
      funFact: data.funFact,
      status: 'pending' as 'pending',
      submittedAt: new Date().toISOString()
    };
    
    // Add to pending locations
    pendingLocations.push(newLocation);
    
    // In a real app, you would save this to your database
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Location submitted successfully and pending review',
      locationId: newLocation.id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing location submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}