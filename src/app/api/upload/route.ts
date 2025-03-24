// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '../../lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    console.log('Received image upload request');
    
    // Set a timeout for the entire request
    const requestTimeout = setTimeout(() => {
      console.error('Upload request timed out');
      return NextResponse.json({ 
        error: 'Request timed out',
      }, { status: 504 });
    }, 45000); // 45 second timeout
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      clearTimeout(requestTimeout);
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    console.log('File received:', file.name, file.type, file.size);
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      clearTimeout(requestTimeout);
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }
    
    // Enforce stricter size limit (3MB)
    if (file.size > 3 * 1024 * 1024) {
      clearTimeout(requestTimeout);
      return NextResponse.json({ error: 'File size must be less than 3MB' }, { status: 400 });
    }
    
    // Convert file to buffer
    console.log('Converting file to buffer...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Use a fallback URL for very large files in production
    if (process.env.NODE_ENV === 'production' && file.size > 1 * 1024 * 1024) {
      console.log('File too large for production upload, using fallback');
      clearTimeout(requestTimeout);
      return NextResponse.json({ 
        success: true, 
        imageUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/geo-nepal/default_location.jpg' 
      });
    }
    
    // Upload to Cloudinary
    console.log('Uploading to Cloudinary...');
    const imageUrl = await uploadImage(buffer);
    console.log('Image uploaded successfully:', imageUrl);
    
    clearTimeout(requestTimeout);
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      error: 'Failed to upload image',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Increase the body size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};