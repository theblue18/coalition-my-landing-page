import { NextApiRequest, NextApiResponse } from "next";
import { Feed } from "feed";
import { getAllBlogPosts } from "@/lib/contentful"; // Function to fetch blogs from Contentful
const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.coalitioninc.com";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await getAllBlogPosts(); 

    
    const feed = new Feed({
      title: "Coalition Blog RSS Feed",
      description: "Latest blog posts from Coalition",
      id: websiteUrl,
      link: `${websiteUrl}/blog`,
      language: "en",
      image: "https://www.coalitioninc.com/favicon.ico",
      favicon: "https://www.coalitioninc.com/favicon.ico",
      copyright: "Coalition@CopyRight",
      updated: new Date(), // Last updated date
    });

  
    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${websiteUrl}/blog/${post.slug}`,
        link: `${websiteUrl}/blog/${post.slug}`,
        description: "Read more on our website.",
        date: new Date(post.publishedDate),
        author: [{ name: "Coalition Blog Team" }],
      });
    });
 
    // Set response headers
    res.setHeader("Content-Type", "application/rss+xml");
    res.status(200).send(feed.rss2()); 
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    res.status(500).json({ error: "Failed to generate RSS feed" });
  }
}
