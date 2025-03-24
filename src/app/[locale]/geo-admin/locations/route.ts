// app/api/geo-admin/locations/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This would typically connect to your database
// This is a mock implementation for demonstration
let mockLocations = [
  {
    id: '1',
    name: 'Annapurna Base Camp',
    lat: 28.5308,
    lng: 83.8800,
    imageUrl: '/images/geo-nepal/annapurna.jpg',
    funFact: 'Annapurna Base Camp is situated at an altitude of 4,130 meters.',
    status: 'pending',
    submittedAt: '2025-03-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Swayambhunath Stupa',
    lat: 27.7149,
    lng: 85.2900,
    imageUrl: '/images/geo-nepal/swayambhunath.jpg',
    funFact: 'Also known as the Monkey Temple, it is one of the oldest religious sites in Nepal.',
    status: 'approved',
    submittedAt: '2025-03-15T08:45:00Z',
    reviewedAt: '2025-03-16T14:22:00Z',
  },
  {
    id: '3',
    name: 'Phewa Lake',
    lat: 28.2156,
    lng: 83.9433,
    imageUrl: '/images/geo-nepal/phewa.jpg',
    funFact: 'Phewa Lake is the second largest lake in Nepal.',
    status: 'rejected',
    submittedAt: '2025-03-18T16:20:00Z',
    reviewedAt: '2025-03-19T09:15:00Z',
  },
];

// GET: Fetch locations with optional status filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const id = searchParams.get('id');
    
    // If ID is provided, return that specific location
    if (id) {
      const location = mockLocations.find(loc => loc.id === id);
      if (!location) {
        return NextResponse.json({ error: 'Location not found' }, { status: 404 });
      }
      return NextResponse.json({ location });
    }
    
    // Filter by status if provided
    let filteredLocations = mockLocations;
    if (status) {
      filteredLocations = mockLocations.filter(
        loc => loc.status === status
      );
    }
    
    return NextResponse.json({ locations: filteredLocations });
  } catch (error) {
    console.error('Error in GET locations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create a new location
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    // Generate a unique ID for the new location
    const newId = (mockLocations.length + 1).toString();
    
    // Create the new location object
    const newLocation = {
      id: newId,
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      imageUrl: data.imageUrl,
      funFact: data.funFact,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    
    // Add to the mock database
    mockLocations.push(newLocation);
    
    return NextResponse.json({ location: newLocation });
  } catch (error) {
    console.error('Error in POST location:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update a location (primarily for status changes)
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.id) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }
    
    // Find the location to update
    const locationIndex = mockLocations.findIndex(loc => loc.id === data.id);
    if (locationIndex === -1) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    
    // Update the location
    mockLocations[locationIndex] = {
      ...mockLocations[locationIndex],
      ...data,
      reviewedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ location: mockLocations[locationIndex] });
  } catch (error) {
    console.error('Error in PUT location:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Remove a location
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }
    
    // Find and remove the location
    const locationIndex = mockLocations.findIndex(loc => loc.id === id);
    if (locationIndex === -1) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    
    // Remove from the mock database
    mockLocations.splice(locationIndex, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE location:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}