import { load } from "cheerio";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: Request) {
  const url = `https://sksd.kayseri.edu.tr/tr/i/1-2/yemek-listesi`;
  const site = await fetch(url);
  if (site.status !== 200) {
    // logger.log(client, "error", `Kayseri Üni. yemekhane sayfasına ulaşılamadı.`);
    return null;
  }
  const siteText = await site.text();
  const $ = load(siteText);
  const result = [];

  $(
    "body > div.content-top > div.container > div > div > div.col-lg-9.mb-4 > table > tbody > tr > td > *"
  ).each((index, element) => {
    if ($(element).text().trim() === "") {
      $(element).remove();
    }
  });

  $(
    "body > div.content-top > div.container > div > div > div.col-lg-9.mb-4 > table > tbody > tr > td > ul"
  ).each((index, ulElement) => {
    const content = [];

    // Boş öğeleri atlayın
    const previousElement = $(ulElement).prev();
    if (previousElement.length > 0) {
      const dayTitle = previousElement
        .text()
        .split("(")[0]
        .trim()
        .replace("\t", " ");
      $(ulElement)
        .find("li")
        .each((index, liElement) => {
          const liTextData = $(liElement)
            .text()
            .trim()
            .replace(/\( +/g, "(")
            .replace(/ +/g, " ");

          const dish = liTextData.split("(")[0].trim();

          content.push(dish);
        });
      if (content.length > 0) {
        result.push({ dayTitle, content });
      }
    }
  });
  return NextResponse.json(result, { status: 200 });
}
