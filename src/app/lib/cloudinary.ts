// src/app/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

// Log the configuration (censored for security)
console.log('Cloudinary config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '[set]' : '[missing]',
  api_key: process.env.CLOUDINARY_API_KEY ? '[set]' : '[missing]',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '[set]' : '[missing]'
});

export async function uploadImage(file: Buffer, folderName: string = 'geo-nepal'): Promise<string> {
  try {
    console.log('Starting Cloudinary upload...');
    
    // Convert buffer to base64
    const base64Data = `data:image/jpeg;base64,${file.toString('base64')}`;
    
    // Upload to Cloudinary with additional options
    const uploadOptions = {
      folder: folderName,
      transformation: [
        { width: 800, crop: "limit" },
        { quality: "auto:good" }
      ],
      timeout: 60000 // Set a longer timeout (60 seconds)
    };
    
    console.log('Upload options:', { ...uploadOptions, folder: uploadOptions.folder });
    const result = await cloudinary.uploader.upload(base64Data, uploadOptions);
    
    console.log('Cloudinary upload successful:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload image');
  }
}