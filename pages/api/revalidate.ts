import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import getRawBody from "raw-body";

const WEBHOOK_SECRET = process.env
  .NEXT_PUBLIC_CONTENTFUL_WEBHOOK_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("🔹 Received Webhook Request:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const rawBody = await getRawBody(req, { encoding: "utf-8" });

    const body = JSON.parse(rawBody);

    const signature = req.headers["x-contentful-signature"] as string;
    if (!signature) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Missing Signature" });
    }

    if (signature !== "test-signature") {
      /* 
        const expectedSignature = crypto.createHmac("sha256", WEBHOOK_SECRET).update(body).digest("hex");
      console.log("Received Signature:", signature);
      console.log("Expected Signature:", expectedSignature);
        if (signature !== expectedSignature) {
          return res.status(401).json({ message: "Unauthorized - Invalid Signature" });
        }*/
    }

    const slug = body.fields?.slug?.["en-US"];
    if (!slug) {
      await res.revalidate("/blog");
      return res.status(200).json({ revalidated: true });
    }

    await res.revalidate(`/blog/${slug}`);
    console.log(` Revalidated: /blog/${slug}`);
    return res.status(200).json({ revalidated: true });
  } catch (error) {
    console.error(" Error processing webhook:", error);
    return res.status(500).json({ message: "Error processing webhook" });
  }
}
