// app/api/geo-admin/locations/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Assuming `pendingLocations` is fetched from another file, 
// ensure it uses the updated `Submission` type.
// Define the Submission interface
interface Submission {
  id: string;
  name: string;
  status: string;
  submittedAt: string;
  reviewedAt?: string; // reviewedAt is optional, hence 'undefined' is allowed
}

// Update the pendingLocations array to match the new interface
// Example of pendingLocations array with reviewedAt included for testing purposes
const pendingLocations: Submission[] = [
  {
    id: '123',
    name: 'Sample Location',
    status: 'Pending',
    submittedAt: '2023-10-01T12:00:00Z',
    reviewedAt: '2023-10-02T12:00:00Z', // reviewedAt is now allowed
  },
  {
    id: '124',
    name: 'Another Location',
    status: 'Pending',
    submittedAt: '2023-10-03T12:00:00Z',
    // reviewedAt is optional and can be undefined
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status'); // 'pending', 'approved', 'rejected', or null for all
  
  try {
    // If status is specified, filter by it; otherwise, return all locations
    const filteredLocations = status 
      ? pendingLocations.filter(loc => loc.status === status)
      : pendingLocations;
    
    return NextResponse.json({ 
      success: true, 
      locations: filteredLocations 
    });
  } catch (error) {
    console.error('Error fetching admin locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

// Update the status of a location (approve/reject)
export async function PUT(request: NextRequest) {
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
    const locationIndex = pendingLocations.findIndex(loc => loc.id === data.id);
    
    if (locationIndex === -1) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }
    
    // Update the location status
    pendingLocations[locationIndex] = {
      ...pendingLocations[locationIndex],
      status: data.status,
      reviewedAt: new Date().toISOString() // Ensure that 'reviewedAt' is set correctly
    };
    
    return NextResponse.json({
      success: true,
      message: `Location ${data.status === 'approved' ? 'approved' : 'rejected'} successfully`,
      location: pendingLocations[locationIndex]
    });
    
  } catch (error) {
    console.error('Error updating location status:', error);
    return NextResponse.json(
      { error: 'Failed to update location status' },
      { status: 500 }
    );
  }
}

// Delete a location
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Location ID is required' },
      { status: 400 }
    );
  }
  
  const locationIndex = pendingLocations.findIndex(loc => loc.id === id);
  
  if (locationIndex === -1) {
    return NextResponse.json(
      { error: 'Location not found' },
      { status: 404 }
    );
  }
  
  // Remove the location from the array
  const deletedLocation = pendingLocations.splice(locationIndex, 1)[0];
  
  return NextResponse.json({
    success: true,
    message: 'Location deleted successfully',
    location: deletedLocation
  });
}
