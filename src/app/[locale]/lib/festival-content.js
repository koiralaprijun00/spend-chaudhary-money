// lib/festival-content.js
import fs from 'fs/promises'; // Use promise-based filesystem
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/festivals');

// Make all functions async
export async function getFestivalSlugs() {
  try {
    // We only need to check one language directory to get all slugs
    const enDirectory = path.join(contentDirectory, 'en');
    const fileNames = await fs.readdir(enDirectory);
    return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error("Error getting festival slugs:", error);
    return []; // Return empty array on error
  }
}

export async function getFestivalContent(slug, locale = 'en') {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.md`);
    
    // Try to read the file for the requested locale
    try {
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        content,
        ...data,
        isFallback: false
      };
    } catch (error) {
      // If locale version not found, try English as fallback
      const fallbackPath = path.join(contentDirectory, 'en', `${slug}.md`);
      const fileContents = await fs.readFile(fallbackPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        content,
        ...data,
        isFallback: true
      };
    }
  } catch (error) {
    console.error(`Error getting content for ${slug} in ${locale}:`, error);
    return null;
  }
}

export async function getAvailableLocales(slug) {
  const locales = [];
  
  // Check which language versions exist for this festival
  const possibleLocales = ['en', 'np']; // Add more as needed
  
  for (const locale of possibleLocales) {
    try {
      const fullPath = path.join(contentDirectory, locale, `${slug}.md`);
      await fs.access(fullPath); // Check if file exists
      locales.push(locale);
    } catch {
      // File doesn't exist, skip
    }
  }
  
  return locales;
}
