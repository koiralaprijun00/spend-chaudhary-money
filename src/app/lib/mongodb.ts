// src/app/lib/mongodb.ts
import { MongoClient, MongoClientOptions } from 'mongodb';

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global MongoDB client reference
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Connection options with more robust SSL configuration and timeout settings
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 15000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
  tlsAllowInvalidHostnames: process.env.NODE_ENV === 'development',
  retryWrites: true,
  retryReads: true
};

// Only use one client instance across server restarts in development
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect()
      .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection for each request
  // This is better for serverless environments
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect()
    .catch(err => {
      console.error('MongoDB connection error in production:', err);
      
      // Create a mock client for fallback functionality
      const mockClient = {
        db: (name: string) => ({
          collection: (collectionName: string) => ({
            find: () => ({ 
              toArray: async () => [],
              project: () => ({ limit: () => ({ toArray: async () => [] }) })
            }),
            findOne: async () => null,
            insertOne: async () => ({ insertedId: 'mock-id' })
          })
        }),
        close: async () => {}
      } as unknown as MongoClient;
      
      // Return the mock client as a resolved promise
      return Promise.resolve(mockClient);
    });
}

export default clientPromise;