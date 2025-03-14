
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("Cron job executed at", new Date().toISOString());

  res.status(200).json({ message: "Cron job executed successfully" });
}
