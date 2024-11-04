// import { Paper, Typography } from "@mui/material";

// export default function PomodoroCard() {
//   return (
//     <Paper
//       sx={{
//         padding: 2,
//         backgroundColor: "#d1c4e9",
//         borderRadius: 6,
//         height: "100%",
//       }}
//     >
//       <Typography variant="h6">Pomodoro</Typography>
//       <Typography variant="body2">00:25</Typography>
//     </Paper>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Paper, Typography, Stack, Box, IconButton } from "@mui/material";
import { Pause, PlayArrow, Restore } from "@mui/icons-material";

export default function PomodoroCard() {
  const pomodoroDuration = 3; // 25 dakika
  const breakDuration = 3; // 5 dakika
  const [timeLeft, setTimeLeft] = useState(pomodoroDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const bellSound = typeof Audio !== "undefined" ? new Audio("/bell.mp3") : null; // Ses dosyası

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      if (bellSound) {
        bellSound.play();
      }
      if (onBreak) {
        setOnBreak(false);
        setTimeLeft(pomodoroDuration);
        setIsRunning(false);
      } else {
        setOnBreak(true);
        setTimeLeft(breakDuration);
        setIsRunning(true);
      }
    }
  }, [isRunning, timeLeft, onBreak, bellSound]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setOnBreak(false);
    setTimeLeft(pomodoroDuration);
  };

  const circleProgress = (1 - timeLeft / (onBreak ? breakDuration : pomodoroDuration)) * 100;

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#d1c4e9",
        borderRadius: 6,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Sol Taraf: Pomodoro başlığı ve butonlar */}
        <Stack direction="column" alignItems="flex-start">
          <Typography variant="h6">Pomodoro</Typography>
          <Stack direction="row" spacing={0.5} sx={{ mt: 0 }}>
            <IconButton onClick={handleStartPause} sx={{ padding: 0.5 }}>
              {isRunning ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleReset} sx={{ padding: 0.5 }}>
              <Restore />
            </IconButton>
          </Stack>
        </Stack>

        {/* Sağ Taraf: Çember şeklinde sayaç */}
        <Box position="relative" display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {onBreak ? (
              <>
                Mola
                <br />
                {formatTime(timeLeft)}
              </>
            ) : (
              formatTime(timeLeft)
            )}
          </Typography>

          {/* Çember */}
          <svg width="62" height="62" viewBox="0 0 36 36">
            <path
              fill="none"
              stroke="#0088D1"
              strokeWidth="3.0"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              fill="none"
              stroke="#91ADE0"
              strokeWidth="3.0"
              strokeDasharray={`${circleProgress}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </Box>
      </Stack>
    </Paper>
  );
}
