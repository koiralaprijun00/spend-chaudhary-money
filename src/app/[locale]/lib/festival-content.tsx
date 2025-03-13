import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Define the FestivalContent interface here to avoid import issues
interface FestivalContent {
  slug: string;
  content: string;
  title: string;
  description: string;
  isFallback?: boolean;
}

export async function getFestivalContent(slug: string, locale = "en"): Promise<FestivalContent | null> {
  try {
    const normalizedSlug = slug.toLowerCase();
    const contentDirectory = path.join(process.cwd(), "content", "festivals");
    const localePath = path.join(contentDirectory, locale);
    const fullPath = path.join(localePath, `${normalizedSlug}.md`);

    console.log(`Attempting to read: ${fullPath}`);
    try {
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Validate required frontmatter fields
      if (!data.title || !data.description) {
        console.error(`Missing required frontmatter fields (title, description) in ${fullPath}`);
        return null;
      }

      return {
        slug: normalizedSlug,
        content,
        title: data.title,
        description: data.description,
        isFallback: false,
      };
    } catch (error) {
      console.log(`File not found for ${normalizedSlug} in ${locale}, trying fallback`);
      const fallbackPath = path.join(contentDirectory, "en", `${normalizedSlug}.md`);
      try {
        const fileContents = await fs.readFile(fallbackPath, "utf8");
        const { data, content } = matter(fileContents);

        // Validate required frontmatter fields
        if (!data.title || !data.description) {
          console.error(`Missing required frontmatter fields (title, description) in ${fallbackPath}`);
          return null;
        }

        return {
          slug: normalizedSlug,
          content,
          title: data.title,
          description: data.description,
          isFallback: true,
        };
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