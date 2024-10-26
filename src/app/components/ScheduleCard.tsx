"use client";

import { Paper, Typography } from "@mui/material";
import config from "@/config.json";

import dayjs from "dayjs";
import "dayjs/locale/tr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
import { Schedule } from "@/types/types";

export default function ScheduleCard() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("tr");

  const [weekDay, setWeekDay] = useState<number>(getWeekDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setWeekDay(getWeekDay());
      setSchedule(config.schedule[weekDay] || []);
    }, 1000);

    return () => clearInterval(interval);
  }, [weekDay]);

  const [schedule, setSchedule] = useState<Schedule[]>(() => {
    return config.schedule[weekDay] || [];
  });

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#d1c4e9",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Ders Programı {weekDay}</Typography>
      {/* <Typography variant="body2">10:00 - 11:30 Algoritmalar</Typography>
      <Typography variant="body2">13:00 - 14:30 Veri Yapıları</Typography> */}
      {(schedule.length > 0 &&
        schedule.map((item) => (
          <Typography variant="body2" key={item.id}>
            {item.time.start} - {item.time.end} {item.name}
          </Typography>
        ))) || <Typography variant="body2">Bugün ders yok</Typography>}
    </Paper>
  );
}

const getWeekDay = () => parseInt(dayjs().tz("Europe/Istanbul").format("d"));
