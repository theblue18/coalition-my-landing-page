import fs from "fs";
import path from "path";
import Parser from "rss-parser";

const CACHE_FILE = path.join(process.cwd(), "rss-cache.json");
const RSS_URL = process.env.NEXT_PUBLIC_RSS_URL || "https://developer.nvidia.com/rss.xml";

/**
 * Fetches the latest RSS post from the feed
 */
export async function getLatestRSSPost() {
  const parser = new Parser();
  const feed = await parser.parseURL(RSS_URL);

  if (!feed.items || feed.items.length === 0) return null;
  return feed.items[0]; // Return the latest blog post
}

/**
 * Retrieves the last stored post ID from the cache file
 */
export function getLastStoredPost(): string | null {
  if (!fs.existsSync(CACHE_FILE)) {
    console.log("RSS Cache file not found. Creating a new one...");
    
    // Fetch the latest post to initialize the cache
    getLatestRSSPost().then((latestPost) => {
      if (latestPost) {
        updateLastStoredPost(latestPost.guid ? latestPost.guid : "1" );
        console.log(`Initialized cache with latest post ID: ${latestPost.guid}`);
      }
    });

    return null; // Return null since no previous data exists
  }

  const data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  return data.latestPostId || null;
}

/**
 * Updates the cache file with the latest post ID
 */
export function updateLastStoredPost(postId: string | null) {
    if(postId){
        fs.writeFileSync(CACHE_FILE, JSON.stringify({ latestPostId: postId }, null, 2));
    }
 
}
