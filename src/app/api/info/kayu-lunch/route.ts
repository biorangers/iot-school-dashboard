import { load } from "cheerio";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET() {
  const url = `https://sksd.kayseri.edu.tr/tr/i/1-2/yemek-listesi`;
  const site = await fetch(url, {
    cache: "no-store",
  });
  if (site.status !== 200) {
    // logger.log(client, "error", `Kayseri Üni. yemekhane sayfasına ulaşılamadı.`);
    return NextResponse.error();
  }
  const siteText = await site.text();
  const $ = load(siteText);
  interface Dish {
    dayTitle: string;
    content: string[];
  }

  const result: Dish[] = [];

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
    const content: string[] = [];

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

          // make first letters big and the rest small
          // const dish = liTextData.split("(")[0].trim()

          const dish = liTextData
            .split(" ")
            .map((word) => {
              return word.charAt(0) + word.slice(1).toLocaleLowerCase("tr-TR");
            })
            .join(" ")
            .trim();

          content.push(dish);
        });
      if (content.length > 0) {
        result.push({ dayTitle, content });
      }
    }
  });
  return NextResponse.json(result, { status: 200 });
}
