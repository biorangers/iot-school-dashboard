"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import LunchCard from "./components/LunchCard";
import HeroCard from "./components/HeroCard";
import PomodoroCard from "./components/PomodoroCard";
import ScheduleCard from "./components/ScheduleCard";
import MusicCard from "./components/MusicCard";
import HomeworkCard from "./components/HomeworkCard";
import VoiceAssistant from "./components/VoiceAssistant";
import { Schedule, Homework, Radio, Config } from "@/types/types";
import Buttons from "./components/Buttons";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lunch, setLunch] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [city, setCity] = useState<string>();
  const [openweathermapApiKey, setOpenweathermapApiKey] = useState<string>();

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      const initAudio = async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          new AudioContext();
        } catch (err) {
          console.error("Ses izni alınamadı:", err);
        }
      };

      if (!showWelcome) {
        initAudio();
      }
    }
  }, [showWelcome]);

  const handleStart = () => {
    setShowWelcome(false);
  };

  useEffect(() => {
    fetch("/api/database?key=1")
      .then((res) => res.json())
      .then((data: Config) => {
        setName(data.name);
        setSchedule(data.schedule);
        setHomeworks(data.homeworks);
        setRadios(data.radios);
        setCity(data.city);
        setOpenweathermapApiKey(data.openweathermapApiKey);
        setLoading(false);
      });
  }, []);

  return showWelcome ? (
    <Dialog open={showWelcome} onClose={() => setShowWelcome(false)}>
      <DialogContent sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Hoş Geldiniz!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Kişisel asistanınızı başlatmak için aşağıdaki butona tıklayın.
        </Typography>
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{ minWidth: 200 }}
        >
          Başlat
        </Button>
      </DialogContent>
    </Dialog>
  ) : (
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
      <Box sx={{ width: "100%", height: "100%", padding: "16px" }}>
        <VoiceAssistant
          config={{
            name,
            schedule,
            homeworks,
            radios,
            city: city || "API Key Gerekli",
            openweathermapApiKey: openweathermapApiKey || "",
          }}
          lunch={lunch}
        />
        <Grid container spacing={2}>
          {/* Top Row: 2x1 2x1 */}
          <Grid size={8} className="min-h-24">
            <HeroCard
              name={name}
              loading={loading}
              city={city || "API Key Gerekli"}
              openweathermapApiKey={openweathermapApiKey}
            />
          </Grid>
          <Grid size={4}>
            <Buttons />
          </Grid>

          {/* Middle Row: 1x2 2x2 1x2 */}
          <Grid size={4} className="min-h-52">
            <HomeworkCard homeworks={homeworks} loading={loading} />
          </Grid>
          <Grid size={4}>
            <ScheduleCard schedule={schedule} loading={loading} />
          </Grid>
          <Grid size={4}>
            <LunchCard lunch={lunch} setLunch={setLunch} />
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
