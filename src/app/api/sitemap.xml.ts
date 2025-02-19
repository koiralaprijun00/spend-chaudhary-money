import { NextResponse } from "next/server"

export async function GET() {
  // Define static pages
  const staticPages = [
    { loc: "https://piromomo.com/", priority: "1.0" },
    { loc: "https://piromomo.com/spend", priority: "0.9" },
    { loc: "https://piromomo.com/blog", priority: "0.8" }
  ]

  // Define dynamic blog posts (Replace this with real blog slugs)
  const blogSlugs = ["binod-chaudhary-net-worth", "another-blog-post"]
  const dynamicBlogPages = blogSlugs.map(slug => ({
    loc: `https://piromomo.com/blog/${slug}`,
    priority: "0.7"
  }))

  // Combine all pages
  const pages = [...staticPages, ...dynamicBlogPages]

  // Generate XML Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          ({ loc, priority }) => `
          <url>
            <loc>${loc}</loc>
            <changefreq>weekly</changefreq>
            <priority>${priority}</priority>
          </url>
        `
        )
        .join("")}
    </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  })
}
