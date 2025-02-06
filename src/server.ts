import express from "express";
import cors from "cors";
import { scrapeAniWorld } from "./scraper";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/anime/api/home", async (req, res) => {
  const data = await scrapeAniWorld();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
