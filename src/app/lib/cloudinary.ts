// src/app/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadImage(file: Buffer, folderName: string = 'geo-nepal'): Promise<string> {
  try {
    // Convert buffer to base64
    const base64Data = `data:image/jpeg;base64,${file.toString('base64')}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: folderName,
      transformation: [
        { width: 800, crop: "limit" },
        { quality: "auto:good" }
      ]
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}