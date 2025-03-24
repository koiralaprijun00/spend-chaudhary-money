import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { MongoLocation, formatLocation } from '../../../lib/locationSchema';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

// Helper function to safely convert string to ObjectId
function safeObjectId(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch (error) {
    console.error('Invalid ObjectId:', id, error);
    return null;
  }
}

// Helper function to verify admin authentication
async function verifyAdminAuth(request: NextRequest) {
  try {
    // Extract the token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid Authorization header found');
      return false;
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('No token found');
      return false;
    }
    
    // Verify the token
    try {
      const secret = process.env.JWT_SECRET || 'default_secret_key';
      const decoded = jwt.verify(token, secret) as any;
      
      console.log('Token decoded:', decoded);
      
      // Check if the user has admin role
      if (!decoded || decoded.role !== 'admin') {
        console.log('User does not have admin role');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  } catch (error) {
    console.error('Auth verification error:', error);
    return false;
  }
}

// GET: Fetch locations with optional status filter
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const isAuthenticated = await verifyAdminAuth(request);
    
    if (!isAuthenticated) {
      console.log('Authentication failed');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const id = searchParams.get('id');
    
    console.log('Fetching locations with status:', status);
    
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // If ID is provided, return that specific location
    if (id) {
      let objectId;
      try {
        objectId = new ObjectId(id);
      } catch (error) {
        return NextResponse.json({ error: 'Invalid location ID format' }, { status: 400 });
      }
      
      const location = await locationsCollection.findOne({ _id: objectId });
      
      if (!location) {
        return NextResponse.json({ error: 'Location not found' }, { status: 404 });
      }
      
      return NextResponse.json({ location: formatLocation(location) });
    }
    
    // Filter by status if provided
    const query = status ? { status: { $eq: status as "pending" | "approved" | "rejected" } } : {};
    const locations = await locationsCollection.find(query).toArray();
    
    console.log(`Found ${locations.length} locations with status: ${status || 'any'}`);
    
    return NextResponse.json({ 
      locations: locations.map(location => formatLocation(location)) 
    });
  } catch (error) {
    console.error('Error in GET locations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


// PUT: Update a location (primarily for status changes)
export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const isAuthenticated = await verifyAdminAuth(request);
    
    if (!isAuthenticated) {
      console.log('Authentication failed for PUT request');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    
    const data = await request.json();
    console.log('Received update data:', data);
    
    // Validate required fields
    if (!data.id) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Use the safe ObjectId conversion
    const objectId = safeObjectId(data.id);
    if (!objectId) {
      return NextResponse.json({ error: 'Invalid location ID format' }, { status: 400 });
    }
    
    // Prepare update data (removing id field which is not in our MongoDB schema)
    const { id, ...updateData } = data;
    
    // Add reviewedAt if status is being updated
    if (updateData.status) {
      updateData.reviewedAt = new Date();
    }
    
    console.log('Updating location with ID:', objectId, 'Update data:', updateData);
    
    // Update the location
    const updateResult = await locationsCollection.updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (updateResult.matchedCount === 0) {
      console.log('No document found for update with ID:', objectId);
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    const updatedLocation = await locationsCollection.findOne({ _id: objectId });
    if (!updatedLocation) {
      console.log('No document found after update with ID:', objectId);
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    // Return the updated document
    return NextResponse.json({ 
      location: formatLocation(updatedLocation),
      success: true 
    });
  } catch (error) {
    console.error('Error in PUT location:', error);
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}


// DELETE: Delete a location
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const isAuthenticated = await verifyAdminAuth(request);
    
    if (!isAuthenticated) {
      console.log('Authentication failed for DELETE request');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    // Get location ID from the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }

    // Convert ID to ObjectId
    const objectId = safeObjectId(id);
    if (!objectId) {
      return NextResponse.json({ error: 'Invalid location ID format' }, { status: 400 });
    }

    // Connect to MongoDB and delete the location
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');

    const result = await locationsCollection.deleteOne({ _id: objectId });

    // If the location does not exist
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE location:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
