import dayjs from "dayjs";
import "dayjs/locale/tr";
import { Config, Homework, Schedule, WeatherData } from "@/types/types";

export function parseHomeworks(homeworks: Homework[]) {
  if (homeworks.length === 0) {
    return "Aktif ödeviniz bulunmamaktadır";
  } else {
    return (
      "Ödevler: " +
      homeworks
        .map((homework) => `${homework.dueDate} ${homework.name}`)
        .join(", ")
    );
  }
}

export function parseLunchMenu(lunchMenu: string[]) {
  if (lunchMenu.length === 1) {
    return "Yemek bulunmamaktadır";
  } else {
    return "Yemekte: " + lunchMenu.join(", ") + " var";
  }
}

export function parseSchedule(schedule: Schedule[]) {
  dayjs.locale("tr");
  const today = dayjs().format("dddd"); // Gets current day name in Turkish

  const todaySchedule = schedule.filter(
    (lesson) => lesson.day.toLowerCase() === today.toLowerCase()
  );

  if (todaySchedule.length === 0) {
    return "Bugün ders yok";
  }

  return (
    "Bugünkü dersler: " +
    todaySchedule
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((lesson) => `${lesson.time}'da ${lesson.subject}`)
      .join(", ")
  );
}

export async function parseSummary(config: Config, lunch: string[]) {
  const weatherData: WeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${config.city}&appid=${config.openweathermapApiKey}&units=metric`
  ).then((res) => res.json());

  return `${parseHomeworks(config.homeworks)} . ${parseSchedule(
    config.schedule
  )} . ${parseLunchMenu(lunch)} . ${parseWeather(weatherData)}`;
}
const en2tr = {
  clear: "güneşli",
  drizzle: "çiseliyor",
  clouds: "bulutlu",
  rain: "yağışlı",
  snow: "karlı",
  atmosphere: "sisli",
  thunderstorm: "fırtına",
} as Record<string, string>;

export function parseWeather(data: WeatherData) {
  const { temp, main, name } = {
    temp: Math.round(data.main.temp),
    main: data.weather[0].main,
    name: data.name,
  };
  return `${name}'da hava şu an ${temp} derece ve ${en2tr[main.toLowerCase()]}`;
}

/*Weather condition codes

 */
