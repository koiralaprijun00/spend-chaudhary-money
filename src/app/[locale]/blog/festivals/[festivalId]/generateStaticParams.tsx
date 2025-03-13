// src/app/[locale]/blog/festivals/[festivalId]/generateStaticParams.ts
import fs from 'fs/promises';
import path from 'path';

// This function generates the static paths for the festivals at build time
export async function generateStaticParams() {
  try {
    // Path to the content directory
    const contentDir = path.join(process.cwd(), "content", "festivals");
    
    // Get all festival MD files from the English directory (as a base)
    const enDir = path.join(contentDir, "en");
    const files = await fs.readdir(enDir);
    
    // Extract the IDs (filenames without .md extension)
    const festivalIds = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
    
    // For each festival ID, create params for both locales
    const params = [];
    const locales = ['en', 'np'];
    
    for (const locale of locales) {
      for (const festivalId of festivalIds) {
        params.push({
          locale,
          festivalId
        });
      }
    }
    
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}