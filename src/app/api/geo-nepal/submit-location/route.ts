// src/app/api/geo-nepal/submit-location/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { MongoLocation } from '../../../lib/locationSchema';

export async function POST(request: NextRequest) {
  try {
    console.log('Received location submission request');
    const data = await request.json();
    console.log('Request data:', data);
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    if (!data.lat || !data.lng) {
      return NextResponse.json({ error: 'Coordinates are required' }, { status: 400 });
    }
    
    if (!data.imageUrl) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Create the new location object
    const newLocation: MongoLocation = {
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      imageUrl: data.imageUrl,
      funFact: data.funFact,
      status: 'pending', // Always set as pending for user submissions
      submittedAt: new Date(),
      submittedBy: data.submittedBy || 'anonymous'
    };
    
    console.log('Inserting new location into database:', newLocation);
    
    // Add to database
    const result = await locationsCollection.insertOne(newLocation);
    console.log('Insert result:', result);
    
    // Return success
    return NextResponse.json({ 
      success: true,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error in POST location:', error);
    // Return more detailed error information
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}