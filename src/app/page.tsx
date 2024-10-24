import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import LunchCard from "./components/LunchCard";
import HeroCard from "./components/HeroCard";
import PomodoroCard from "./components/PomodoroCard";
import ScheduleCard from "./components/ScheduleCard";
import MusicCard from "./components/MusicCard";
import HomeworkCard from "./components/HomeworkCard";
import AnnouncementCard from "./components/AnnouncementCard";

export default function Home() {
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
      <Box sx={{ width: "100%", height: "100%", padding: "2px" }}>
        <Grid container spacing={2}>
          {/* Top Row: 2x1 2x1 */}
          <Grid size={6}>
            <HeroCard />
          </Grid>
          <Grid size={6}>
            <AnnouncementCard />
          </Grid>

          {/* Middle Row: 1x2 2x2 1x2 */}
          <Grid size={4}>
            <HomeworkCard />
          </Grid>
          <Grid size={4}>
            <ScheduleCard />
          </Grid>
          <Grid size={4}>
            <LunchCard />
          </Grid>

          {/* Bottom Row: 2x1 2x1 */}
          <Grid size={6}>
            <PomodoroCard />
          </Grid>
          <Grid size={6}>
            <MusicCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
