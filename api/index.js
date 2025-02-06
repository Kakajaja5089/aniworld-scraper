import axios from "axios";
import cheerio from "cheerio";

const BASE_URL = "https://aniworld.to";

async function scrapeAniWorld() {
  try {
    const { data } = await axios.get(BASE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
      }
    });

    const $ = cheerio.load(data);
    const animeList = [];

    $(".seriesList .serie").each((_, element) => {
      const title = $(element).find(".title").text().trim();
      const img = $(element).find("img").attr("src");
      const link = BASE_URL + $(element).find("a").attr("href");

      animeList.push({ name: title, img, link });
    });

    return animeList;
  } catch (error) {
    console.error("Scraping error:", error);
    return { error: "Failed to fetch AniWorld data." };
  }
}

export default async function handler(req, res) {
  const data = await scrapeAniWorld();
  return res.json(data);
}
