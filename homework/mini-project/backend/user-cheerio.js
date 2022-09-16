import axios from "axios";
import cheerio from "cheerio";

export async function preferURL(site) {
  const result = await axios.get(site);

  const $ = cheerio.load(result.data);

  let ogData = {};

  $("meta").each((_, el) => {
    if ($(el).attr("property")?.includes("og:")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");

      ogData[key] = value;
    }
  });
  return ogData;
}
