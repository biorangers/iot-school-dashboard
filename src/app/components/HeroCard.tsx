"use client";

import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Skeleton,
  Stack,
  Grid2,
  useTheme,
} from "@mui/material";
import {
  WbSunny,
  Cloud,
  CloudQueue,
  Thunderstorm,
  AcUnit,
  VisibilityOff,
} from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

interface WeatherData {
  temp: number;
  weather: string;
}

export default function HeroCard({
  name,
  loading,
  city,
  openweathermapApiKey,
}: {
  name: string;
  loading: boolean;
  city: string;
  openweathermapApiKey: string | undefined;
}) {
  const theme = useTheme();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("tr");

  const [date, setDate] = useState(
    dayjs().tz("Europe/Istanbul").format("HH:mm - DD MMMM dddd")
  );
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermapApiKey}&units=metric`
        );
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          weather: data.weather[0].main,
        });
      } catch (error) {
        console.error("Weather fetch error:", error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, [city, openweathermapApiKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs().tz("Europe/Istanbul").format("HH:mm - DD MMMM dddd"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType?.toLowerCase()) {
      case "clear":
        return <WbSunny />;
      case "clouds":
        return <Cloud />;
      case "rain":
        return <CloudQueue />;
      case "thunderstorm":
        return <Thunderstorm />;
      case "snow":
        return <AcUnit />;
      case "atmosphere":
        return <VisibilityOff />;
      default:
        return <WbSunny />;
    }
  };

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: theme.palette.cards.hero.bg,
        color: theme.palette.cards.hero.text,
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Grid2 container justifyContent="space-between" alignItems="flex-center">
        <Stack justifyContent="space-between">
          {loading ? (
            <Skeleton variant="text" width={200} height={30} />
          ) : (
            <Typography variant="h5">Merhaba, {name}</Typography>
          )}
          <Typography variant="subtitle1">{date}</Typography>
        </Stack>

        <Grid2 textAlign="right">
          <Stack alignItems="flex-end">
            <Typography variant="h6">{city}</Typography>
            {weatherLoading ? (
              <Skeleton variant="text" width={100} height={30} />
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                {weather && getWeatherIcon(weather.weather)}
                <Typography variant="h6">{weather?.temp}°C</Typography>
              </Stack>
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Paper>
  );
}
