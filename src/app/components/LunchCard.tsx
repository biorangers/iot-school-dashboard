"use client";

import { List, ListItem, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function LunchCard() {
  const [meals, setMeals] = useState<string[]>([]);
  // TODO design better view list for lunch menu
  useEffect(() => {
    const fetchLunchMenu = async () => {
      try {
        const response = await fetch("/api/info/kayu-lunch");
        const lunchData = await response.json();
        const date = new Date();
        const isWeekend = date.getDay() === 6 || date.getDay() === 0;
        if (isWeekend) setMeals(["Hafta sonu"]);
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
        <List>
          {meals.map((meal, index) => (
            <ListItem key={index}>{meal}</ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">Yemek bilgisi bulunamadı.</Typography>
      )}
    </Paper>
  );
}
