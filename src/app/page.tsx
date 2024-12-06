"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import LunchCard from "./components/LunchCard";
import HeroCard from "./components/HeroCard";
import PomodoroCard from "./components/PomodoroCard";
import ScheduleCard from "./components/ScheduleCard";
import MusicCard from "./components/MusicCard";
import HomeworkCard from "./components/HomeworkCard";
import AnnouncementCard from "./components/AnnouncementCard";
import VoiceAssistant from "./components/VoiceAssistant";
import { Schedule, Homework, Radio, Config } from "@/types/types";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/database?key=1")
      .then((res) => res.json())
      .then((data: Config) => {
        setName(data.name);
        setSchedule(data.schedule);
        setHomeworks(data.homeworks);
        setRadios(data.radios);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(/bg.webp)`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VoiceAssistant />
      <Box sx={{ width: "100%", height: "100%", padding: "16px" }}>
        <Grid container spacing={2}>
          {/* Top Row: 2x1 2x1 */}
          <Grid size={6} className="min-h-24">
            <HeroCard name={name} loading={loading} />
          </Grid>
          <Grid size={6}>
            <AnnouncementCard />
          </Grid>

          {/* Middle Row: 1x2 2x2 1x2 */}
          <Grid size={4} className="min-h-52">
            <HomeworkCard homeworks={homeworks} loading={loading} />
          </Grid>
          <Grid size={4}>
            <ScheduleCard schedule={schedule} loading={loading} />
          </Grid>
          <Grid size={4}>
            <LunchCard />
          </Grid>

          {/* Bottom Row: 2x1 2x1 */}
          <Grid size={6} className="min-h-24">
            <PomodoroCard />
          </Grid>
          <Grid size={6}>
            <MusicCard radios={radios} loading={loading} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
