"use client";

import { Paper, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import Loading from "./Loading";

export default function LunchCard({
  lunch,
  setLunch,
}: {
  lunch: string[];
  setLunch: (lunch: string[]) => void;
}) {
  // TODO design better view list for lunch menu
  useEffect(() => {
    const fetchLunchMenu = async () => {
      try {
        const date = new Date();
        const isWeekend = date.getDay() === 6 || date.getDay() === 0;
        if (isWeekend) setLunch(["Hafta sonu"]);

        const response = await fetch("/api/info/kayu-lunch");
        const lunchData = await response.json();

        const today = date.getDate().toString();
        const lunchInfo = lunchData.find(
          (item: { dayTitle: string; content: string[] }) =>
            item.dayTitle.startsWith(`${today}.`) ||
            item.dayTitle.startsWith(`${today} `) ||
            item.dayTitle.startsWith(`0${today}.`)
        );
        if (lunchInfo) {
          setLunch(lunchInfo.content);
        }
      } catch (error) {
        console.error("Error fetching lunch menu:", error);
      }
    };

    fetchLunchMenu();
  }, [setLunch]);

  const theme = useTheme();

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 6,
        backgroundColor: theme.palette.cards.lunch.bg,
        color: theme.palette.cards.lunch.text,
        height: "100%",
      }}
    >
      <Typography variant="h6">Öğle Yemeği</Typography>

      {lunch.length > 0 ? (
        lunch.map((item: string, id: number) => (
          <Typography
            variant="body2"
            key={id + "meal"}
            sx={{ cursor: "pointer", margin: "4px 0" }}
          >
            {item}
          </Typography>
        ))
      ) : (
        <Loading />
      )}
    </Paper>
  );
}
