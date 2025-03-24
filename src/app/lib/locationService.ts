// src/app/lib/locationService.ts
import clientPromise from './mongodb';
import { MongoLocation, formatLocation } from './locationSchema';
import { Location } from '../data/geo-nepal/geo-data';

// Get all approved locations from MongoDB for the game
export async function getApprovedLocations(): Promise<Location[]> {
  try {
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Get only approved locations
    const approvedLocations = await locationsCollection
      .find({ status: 'approved' })
      .toArray();
    
    // Convert to the format expected by the game
    return approvedLocations.map(location => ({
      id: location._id?.toString() || '',
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      imageUrl: location.imageUrl,
      funFact: location.funFact
    }));
  } catch (error) {
    console.error('Error fetching approved locations:', error);
    return []; // Return empty array in case of error
  }
}

// Get a specific location by ID
export async function getLocationById(id: string): Promise<Location | null> {
  try {
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Find the location by ID
    const location = await locationsCollection.findOne({ 
      _id: new Object(id),
      status: 'approved' // Ensure we only return approved locations
    });
    
    if (!location) return null;
    
    return {
      id: location._id?.toString() || '',
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      imageUrl: location.imageUrl,
      funFact: location.funFact
    };
  } catch (error) {
    console.error('Error fetching location by ID:', error);
    return null;
  }
}

// Submit a new location
export async function submitLocation(locationData: Omit<Location, 'id'>): Promise<Location | null> {
  try {
    const client = await clientPromise;
    const db = client.db('geo-nepal');
    const locationsCollection = db.collection<MongoLocation>('locations');
    
    // Create the new location with pending status
    const newLocation: MongoLocation = {
      name: locationData.name,
      lat: locationData.lat,
      lng: locationData.lng,
      imageUrl: locationData.imageUrl,
      funFact: locationData.funFact,
      status: 'pending',
      submittedAt: new Date()
    };
    
    // Insert into database
    const result = await locationsCollection.insertOne(newLocation);
    
    // Return the new location with its ID
    return {
      id: result.insertedId.toString(),
      ...locationData
    };
  } catch (error) {
    console.error('Error submitting location:', error);
    return null;
  }
}