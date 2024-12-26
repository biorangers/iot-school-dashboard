"use client";

import { Paper, Typography, useTheme } from "@mui/material";

import dayjs from "dayjs";
import "dayjs/locale/tr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
import { Schedule } from "@/types/types";
import Loading from "./Loading";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("tr");

export default function ScheduleCard({
  schedule,
  loading,
}: {
  schedule: Schedule[];
  loading: boolean;
}) {
  const [weekDay, setWeekDay] = useState<string>(getWeekDay());
  const [todaySchedule, setTodaySchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeekDay(getWeekDay());
      const todayFilteredSchedule = schedule.filter(
        (item) => item.day === weekDay
      );
      setTodaySchedule(todayFilteredSchedule);
    }, 1000);

    return () => clearInterval(interval);
  }, [weekDay, schedule]);

  const theme = useTheme();

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: theme.palette.cards.schedule.bg,

        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Ders Programı</Typography>
      {loading ? (
        <Loading />
      ) : (
        (todaySchedule.length > 0 &&
          todaySchedule.map((item: Schedule) => (
            <Typography
              variant="body2"
              key={item.id}
              sx={{ cursor: "pointer", margin: "4px 0" }}
            >
              {item.time} - {item.subject}
            </Typography>
          ))) || (
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", margin: "4px 0" }}
          >
            Bugün ders yok
          </Typography>
        )
      )}
    </Paper>
  );
}

const weekDays = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

const getWeekDay = () => {
  const dayNumber = parseInt(dayjs().tz("Europe/Istanbul").format("d")) - 1;
  return weekDays[dayNumber];
};
