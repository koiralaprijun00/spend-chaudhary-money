// src/app/[locale]/lib/festival-content.js
import fs from 'fs/promises'; // Use promise-based filesystem
import path from 'path';
import matter from 'gray-matter';

// In src/app/[locale]/lib/festival-content.js

export async function getFestivalContent(slug, locale = "en") {
  try {
    const normalizedSlug = slug.toLowerCase();
    const contentDirectory = path.join(process.cwd(), "content", "festivals");
    const localePath = path.join(contentDirectory, locale);
    const fullPath = path.join(localePath, `${normalizedSlug}.md`);

    console.log(`Attempting to read: ${fullPath}`);
    try {
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return { slug: normalizedSlug, content, ...data, isFallback: false };
    } catch (error) {
      console.log(`File not found for ${normalizedSlug} in ${locale}, trying fallback`);
      const fallbackPath = path.join(contentDirectory, "en", `${normalizedSlug}.md`);
      try {
        const fileContents = await fs.readFile(fallbackPath, "utf8");
        const { data, content } = matter(fileContents);
        return { slug: normalizedSlug, content, ...data, isFallback: true };
      } catch (fallbackError) {
        console.error(`Fallback failed for ${normalizedSlug}:`, fallbackError);
        return null;
      }
    }
  } catch (error) {
    console.error(`Unexpected error for ${slug} in ${locale}:`, error);
    return null;
  }
}