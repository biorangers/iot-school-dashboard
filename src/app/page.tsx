// pages/index.js
import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";

import LunchCard from "./components/LunchCard";

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
      <div className="w-screen h-screen pb-2 px-2">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
          {/* Top Row: Greeting & Notifications - Fixed height */}
          <Grid container spacing={2} sx={{ minHeight: "100px" }}>
            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#C6F432",
                  borderRadius: 6,
                  height: "100%",
                }}
              >
                <Typography variant="h5">Merhaba, Metin</Typography>
                <Typography variant="subtitle1">
                  12:27 12 Ekim Çarşamba
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#d1c4e9",
                  borderRadius: 6,
                  height: "100%",
                }}
              >
                <Typography variant="h5">Duyurular</Typography>
                <Typography variant="subtitle1">
                  MMTF - Erasmus Toplantısı Duyurusu
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Middle Row: Assignments, Class Schedule, Lunch Menu - Fixed height (2x) */}
          <Grid container spacing={2} sx={{ minHeight: "200px" }}>
            <Grid item xs={3}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#ffcccb",
                  borderRadius: 6,
                  height: "100%",
                }}
              >
                <Typography variant="h6">Ödevler</Typography>
                <Typography variant="body2">
                  Nesnelerin İnt. - 24 Ekim
                </Typography>
                <Typography variant="body2">Tasarım Uyg. - 25 Kasım</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#d1c4e9",
                  borderRadius: 6,
                  height: "100%",
                }}
              >
                <Typography variant="h6">Ders Programı</Typography>
                <Typography variant="body2">
                  10:00 - 11:30 Algoritmalar
                </Typography>
                <Typography variant="body2">
                  13:00 - 14:30 Veri Yapıları
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <LunchCard />
            </Grid>
          </Grid>

          {/* Bottom Row: Pomodoro Timer & Lofi Music - Fixed height */}
          <Grid container spacing={2} sx={{ minHeight: "100px" }}>
            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#d1c4e9",
                  borderRadius: 6,
                  height: "100%",
                }}
              >
                <Typography variant="h6">Pomodoro</Typography>
                <Typography variant="body2">00:25</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#d1c4e9",
                  borderRadius: 6,
                  height: "100%",
                }}
              >
                <Typography variant="h6">Lofi Beats - Chillhop</Typography>
                <Button variant="contained">Play</Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}
