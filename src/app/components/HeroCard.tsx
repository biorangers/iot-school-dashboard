"use client";

import { Paper, Typography } from "@mui/material";
import config from "@/config.json";

import dayjs from "dayjs";
import "dayjs/locale/tr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";

export default function HeroCard() {
  // 12:27 12 Ekim Çarşamba
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // locale turkish
  dayjs.locale("tr");
  const [date, setDate] = useState(
    dayjs().tz("Europe/Istanbul").format("HH:mm DD MMMM dddd")
  );

  setInterval(() => {
    setDate(dayjs().tz("Europe/Istanbul").format("HH:mm DD MMMM dddd"));
  }, 1000);

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#C6F432",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h5">Merhaba, {config.name || "Name"}</Typography>
      <Typography variant="subtitle1">{date}</Typography>
    </Paper>
  );
}
