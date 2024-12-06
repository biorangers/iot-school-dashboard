"use client";

import { Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function LunchCard() {
  const [meals, setMeals] = useState<string[]>([]);
  // TODO design better view list for lunch menu
  useEffect(() => {
    const fetchLunchMenu = async () => {
      try {
        const date = new Date();
        const isWeekend = date.getDay() === 6 || date.getDay() === 0;
        if (isWeekend) setMeals(["Hafta sonu"]);

        const response = await fetch("/api/info/kayu-lunch");
        const lunchData = await response.json();

        const today = date.getDate().toString().padStart(2, "0");
        const lunchInfo = lunchData.find(
          (item: { dayTitle: string; content: string[] }) =>
            item.dayTitle.startsWith(`${today}.`) ||
            item.dayTitle.startsWith(`${today} `) ||
            item.dayTitle.startsWith(`0${today}.`)
        );
        if (lunchInfo) {
          setMeals(lunchInfo.content);
        }
      } catch (error) {
        console.error("Error fetching lunch menu:", error);
      }
    };

    fetchLunchMenu();
  }, []);

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#ffcccb",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Öğle Yemeği</Typography>

      {meals.length > 0 ? (
        meals.map((item: string, id: number) => (
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
