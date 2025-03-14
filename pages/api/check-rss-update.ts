import { NextApiRequest, NextApiResponse } from "next";
import { getLatestRSSPost, getLastStoredPost, updateLastStoredPost } from "@/lib/rssTracker";

const slackWebhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "http://localhost:3000";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const latestPost = await getLatestRSSPost();
    if (!latestPost) return res.status(200).json({ message: "No blog posts found in RSS feed." });

    const lastStoredPostId = getLastStoredPost();

    // If cache is just initialized, don't send a notification yet
    if (!lastStoredPostId) {
      return res.status(200).json({ message: "Cache initialized. No updates yet." });
    }

    // If the latest post is already stored, do nothing
    if (latestPost.guid === lastStoredPostId) {
      return res.status(200).json({ message: "No new updates in RSS feed." });
    }

    // New post detected → Send to Slack
    const messagePayload = {
      blocks: [
        { type: "section", text: { type: "mrkdwn", text: "🆕 *New Blog Published!*" } },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${latestPost.title}*\n_${latestPost.contentSnippet || "No description available"}_\n\n🔗 <${latestPost.link}|Read More>`,
          },
          accessory: latestPost.enclosure?.url
            ? { type: "image", image_url: latestPost.enclosure.url, alt_text: "Blog Thumbnail" }
            : undefined,
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: { type: "plain_text", text: "Read Blog" },
              url: latestPost.link,
              style: "primary",
            },
          ],
        },
      ],
    };

    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messagePayload),
    });

    // Update the stored latest post ID
    updateLastStoredPost(latestPost.guid || null );

    res.status(200).json({ success: true, message: "New RSS update sent to Slack." });
  } catch (error) {
    console.error("Error checking RSS updates:", error);
    res.status(500).json({ error: "Failed to check RSS feed" });
  }
}
