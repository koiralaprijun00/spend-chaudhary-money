// src/app/[locale]/lib/festival-content.js
import fs from 'fs/promises'; // Use promise-based filesystem
import path from 'path';
import matter from 'gray-matter';

// In src/app/[locale]/lib/festival-content.js

export async function getFestivalContent(slug, locale = 'en') {
  try {
    // Normalize the slug to ensure consistent casing
    const normalizedSlug = slug.toLowerCase();
    
    const contentDirectory = path.join(process.cwd(), 'content', 'festivals');
    const localePath = path.join(contentDirectory, locale);
    const fullPath = path.join(localePath, `${normalizedSlug}.md`);
    
    try {
      // Try to read the file for the requested locale
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: normalizedSlug,
        content,
        ...data,
        isFallback: false
      };
    } catch (error) {
      console.log(`Festival file not found for locale ${locale}, trying English fallback`);
      
      // If locale version not found, try English as fallback
      const fallbackPath = path.join(contentDirectory, 'en', `${normalizedSlug}.md`);
      try {
        const fileContents = await fs.readFile(fallbackPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug: normalizedSlug,
          content,
          ...data,
          isFallback: true
        };
      } catch (fallbackError) {
        console.error(`Fallback content not found for ${normalizedSlug}:`, fallbackError);
        return null;
      }
    }
  } catch (error) {
    console.error(`Error getting content for ${slug} in ${locale}:`, error);
    return null;
  }
}