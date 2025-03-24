// src/app/api/admin/fallback-auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// This is a fallback authentication endpoint that doesn't require MongoDB
// It should only be used in case the main authentication system fails
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, password } = await req.json();
    
    // Check if the environment variables for admin credentials are set
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.error('Admin credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Check if the provided credentials match the admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate a JWT token
      const token = jwt.sign(
        {
          id: 'admin-fallback',
          email,
          role: 'admin',
        },
        process.env.JWT_SECRET || 'default_secret_key',
        { expiresIn: '7d' }
      );
      
      // Return the token
      return NextResponse.json({
        success: true,
        user: {
          id: 'admin-fallback',
          email,
          name: 'Admin',
          role: 'admin',
        },
        accessToken: token,
      });
    }
    
    // If credentials don't match, return an error
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Fallback auth error:', error);
    return NextResponse.json(
      { error: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}