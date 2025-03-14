import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Revalidate the RSS page
    await res.revalidate("/rss.xml");
   
    return res.status(200).json({ message: "RSS Feed Page Revalidated" });
  } catch (error) {
    console.error("Error revalidating RSS:", error);
    return res.status(500).json({ error: "Failed to revalidate RSS feed" });
  }
}
