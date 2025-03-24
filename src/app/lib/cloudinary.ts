// src/app/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

export async function uploadImage(file: Buffer, folderName: string = 'geo-nepal'): Promise<string> {
  try {
    console.log('Starting Cloudinary upload...');
    
    // Use a timeout promise to prevent hanging
    const uploadPromise = new Promise<string>((resolve, reject) => {
      // Convert buffer to base64
      const base64Data = `data:image/jpeg;base64,${file.toString('base64')}`;
      
      // Upload to Cloudinary with additional options
      cloudinary.uploader.upload(
        base64Data, 
        {
          folder: folderName,
          transformation: [
            { width: 800, crop: "limit" },
            { quality: "auto:good" }
          ],
          timeout: 30000 // 30 second timeout
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else if (result) {
            console.log('Cloudinary upload successful');
            resolve(result.secure_url);
          } else {
            reject(new Error('Unknown error during Cloudinary upload'));
          }
        }
      );
    });
    
    // Set an overall timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Cloudinary upload timed out after 30s')), 30000);
    });
    
    // Race between upload and timeout
    return await Promise.race([uploadPromise, timeoutPromise]);
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload image');
  }
}