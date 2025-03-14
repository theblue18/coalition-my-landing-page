import { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

const SLACK_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "http://localhost:3000";

  const RSS_URL = process.env.NEXT_PUBLIC_RSS_URL ||
      "https://coalition-my-landing-page.vercel.app/rss.xml";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
   

    if (!RSS_URL) {
      return res
        .status(400)
        .json({ error: "Missing RSS URL. Provide it in request body or env." });
    }

    const parser = new Parser();
    const feed = await parser.parseURL(RSS_URL);

    if (!feed.items || feed.items.length === 0) {
      return res.status(200).json({ message: "No new blog posts found." });
    }

    const latestPost = feed.items[0]; // Get the latest blog post

    const messagePayload = {
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: "🆕 *New Blog Published!*" },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${latestPost.title}*\n_${latestPost.contentSnippet || "Click Read More to see details"}_\n\n🔗 <${latestPost.link}|Read More>`,
          },
          accessory: latestPost.enclosure?.url
            ? {
                type: "image",
                image_url: latestPost.enclosure.url,
                alt_text: "Blog Thumbnail",
              }
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
    

    // Send to Slack
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messagePayload),
    });

    res
      .status(200)
      .json({ success: true, message: "Sent latest blog post to Slack" });
  } catch (error) {
    console.error("Error sending RSS Feed update to Slack:", error);
    res.status(500).json({ error: "Failed to send Slack message" });
  }
}
