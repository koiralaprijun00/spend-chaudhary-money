import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Define a consistent Location interface
interface Location {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  imageUrl?: string;
  funFact?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
}

// In a real application, this would be fetched from a database
// For this example, we'll use an array in memory
let locations: Location[] = [
  {
    id: '1',
    name: 'Annapurna Base Camp',
    lat: 28.5308,
    lng: 83.8800,
    imageUrl: '/images/locations/annapurna.jpg',
    funFact: 'One of the most popular trekking destinations in Nepal',
    status: 'pending',
    submittedAt: '2025-03-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Kathmandu Durbar Square',
    lat: 27.7048,
    lng: 85.3068,
    imageUrl: '/images/locations/kathmandu-durbar.jpg',
    funFact: 'This UNESCO World Heritage site was damaged in the 2015 earthquake but remains a cultural hub',
    status: 'approved',
    submittedAt: '2025-02-15T08:30:00Z',
    reviewedAt: '2025-02-16T14:20:00Z'
  },
  {
    id: '3',
    name: 'Pokhara Lakeside',
    lat: 28.2096,
    lng: 83.9856,
    imageUrl: '/images/locations/pokhara.jpg',
    funFact: 'Phewa Lake is the second largest lake in Nepal',
    status: 'rejected',
    submittedAt: '2025-03-10T09:45:00Z',
    reviewedAt: '2025-03-11T11:15:00Z'
  }
];

// GET - Fetch locations (with filtering for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status'); // 'pending', 'approved', 'rejected', or null
  const isAdmin = searchParams.get('admin') === 'true'; // Simple admin check
  
  console.log('GET request:', { status, isAdmin });
  console.log('Current locations array:', locations);
  
  try {
    // For regular users, only return approved locations
    if (!isAdmin) {
      const approvedLocations = locations.filter(loc => loc.status === 'approved');
      return NextResponse.json({ 
        success: true, 
        locations: approvedLocations 
      });
    }
    
    // For admin requests, filter by status if specified
    const filteredLocations = status 
      ? locations.filter(loc => loc.status === status)
      : locations;
    
    return NextResponse.json({ 
      success: true, 
      locations: filteredLocations 
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

// POST - Create a new location (user submission)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Received location submission:', data);
    
    // Validate required fields
    const requiredFields = ['name', 'lat', 'lng', 'funFact'];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        return NextResponse.json({ 
          error: `Missing required field: ${field}` 
        }, { status: 400 });
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
    const newLocation: Location = {
      id: uuidv4(),
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      imageUrl: data.imageUrl || '/images/placeholder.jpg',
      funFact: data.funFact,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    // Add to locations array
    locations.push(newLocation);
    console.log('Current locations array after submission:', locations);
    
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

// PUT - Update location status (admin only)
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get('admin') === 'true'; // Simple admin check
  
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.id || !data.status || !['approved', 'rejected', 'pending'].includes(data.status)) {
      return NextResponse.json(
        { error: 'Invalid request. Required fields: id, status (approved/rejected/pending)' },
        { status: 400 }
      );
    }
    
    // Find the location to update
    const locationIndex = locations.findIndex(loc => loc.id === data.id);
    
    if (locationIndex === -1) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }
    
    // Update the location status
    locations[locationIndex] = {
      ...locations[locationIndex],
      status: data.status,
      reviewedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: `Location ${data.status === 'approved' ? 'approved' : 'rejected'} successfully`,
      location: locations[locationIndex]
    });
    
  } catch (error) {
    console.error('Error updating location status:', error);
    return NextResponse.json(
      { error: 'Failed to update location status' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a location (admin only)
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const isAdmin = searchParams.get('admin') === 'true'; // Simple admin check
  
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  if (!id) {
    return NextResponse.json(
      { error: 'Location ID is required' },
      { status: 400 }
    );
  }
  
  const locationIndex = locations.findIndex(loc => loc.id === id);
  
  if (locationIndex === -1) {
    return NextResponse.json(
      { error: 'Location not found' },
      { status: 404 }
    );
  }
  
  // Remove the location from the array
  const deletedLocation = locations.splice(locationIndex, 1)[0];
  
  return NextResponse.json({
    success: true,
    message: 'Location deleted successfully',
    location: deletedLocation
  });
}