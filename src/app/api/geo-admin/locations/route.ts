// app/api/geo-admin/locations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { MongoLocation, formatLocation } from '../../../lib/locationSchema';
import { ObjectId } from 'mongodb';

// GET: Fetch locations with optional status filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const id = searchParams.get('id');
    
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
    
    return NextResponse.json({ 
      locations: locations.map(location => formatLocation(location)) 
    });
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
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Create the new location object
    const newLocation: MongoLocation = {
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      imageUrl: data.imageUrl,
      funFact: data.funFact,
      status: 'pending',
      submittedAt: new Date(),
      submittedBy: data.submittedBy
    };
    
    // Add to database
    const result = await locationsCollection.insertOne(newLocation);
    
    // Return the new location with its ID
    return NextResponse.json({ 
      location: formatLocation({...newLocation, _id: result.insertedId})
    });
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
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Convert string ID to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(data.id);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid location ID format' }, { status: 400 });
    }
    
    // Prepare update data (removing id field which is not in our MongoDB schema)
    const { id, ...updateData } = data;
    
    // Add reviewedAt if status is being updated
    if (updateData.status) {
      updateData.reviewedAt = new Date();
    }
    
    // Update the location
    const result = await locationsCollection.findOneAndUpdate(
      { _id: objectId },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    
    return NextResponse.json({ location: formatLocation(result) });
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
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Convert string ID to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid location ID format' }, { status: 400 });
    }
    
    // Delete the location
    const result = await locationsCollection.deleteOne({ _id: objectId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE location:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}