// src/app/lib/locationSchema.ts
import { ObjectId } from 'mongodb';

// Interface for locations stored in MongoDB
export interface MongoLocation {
  _id?: ObjectId;
  name: string;
  lat: number;
  lng: number;
  imageUrl: string;
  funFact: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  submittedBy?: string; // Optional field to track user submissions
}

// Function to convert MongoDB data to client-friendly format
export function formatLocation(location: MongoLocation) {
  return {
    id: location._id?.toString() || '',
    name: location.name,
    lat: location.lat,
    lng: location.lng,
    imageUrl: location.imageUrl,
    funFact: location.funFact,
    status: location.status,
    submittedAt: location.submittedAt.toISOString(),
    reviewedAt: location.reviewedAt ? location.reviewedAt.toISOString() : undefined,
    submittedBy: location.submittedBy
  };
}