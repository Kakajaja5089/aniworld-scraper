import { VercelRequest, VercelResponse } from "@vercel/node";
import { scrapeAniWorld } from "../src/scraper";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const data = await scrapeAniWorld();
  return res.json(data);
}
