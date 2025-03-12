// src/app/[locale]/lib/festival-content.js
import fs from 'fs/promises'; // Use promise-based filesystem
import path from 'path';
import matter from 'gray-matter';

// Updated to properly handle paths
export async function getFestivalContent(slug, locale = 'en') {
  try {
    const contentDirectory = path.join(process.cwd(), 'content', 'festivals');
    const localePath = path.join(contentDirectory, locale);
    const fullPath = path.join(localePath, `${slug}.md`);
    
    try {
      // Try to read the file for the requested locale
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        content,
        ...data,
        isFallback: false
      };
    } catch (error) {
      console.log(`Festival file not found for locale ${locale}, trying English fallback`);
      
      // If locale version not found, try English as fallback
      const fallbackPath = path.join(contentDirectory, 'en', `${slug}.md`);
      try {
        const fileContents = await fs.readFile(fallbackPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug,
          content,
          ...data,
          isFallback: true
        };
      } catch (fallbackError) {
        console.error(`Fallback content not found for ${slug}:`, fallbackError);
        return null;
      }
    }
  } catch (error) {
    console.error(`Error getting content for ${slug} in ${locale}:`, error);
    return null;
  }
}

// Function to get all available festival slugs - useful for static path generation
export async function getFestivalSlugs() {
  try {
    // Check English directory for all possible slugs
    const enDirectory = path.join(process.cwd(), 'content', 'festivals', 'en');
    const fileNames = await fs.readdir(enDirectory);
    return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error("Error getting festival slugs:", error);
    return []; // Return empty array on error
  }
}

// Function to check which locales are available for a specific festival
export async function getAvailableLocales(slug) {
  const locales = [];
  const possibleLocales = ['en', 'np']; // Add more as needed
  
  for (const locale of possibleLocales) {
    try {
      const fullPath = path.join(process.cwd(), 'content', 'festivals', locale, `${slug}.md`);
      await fs.access(fullPath); // Check if file exists
      locales.push(locale);
    } catch {
      // File doesn't exist, skip
    }
  }
  
  return locales;
}