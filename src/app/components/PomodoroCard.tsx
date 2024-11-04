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
import { Paper, Typography, Button, Stack, LinearProgress } from "@mui/material";

export default function PomodoroCard() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft]);

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
    setTimeLeft(1500);
  };

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#d1c4e9",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Pomodoro</Typography>
      <Typography variant="body2">{formatTime(timeLeft)}</Typography>
      <LinearProgress variant="determinate" value={(timeLeft / 1500) * 100} sx={{ marginTop: 1 }} />
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleStartPause}>
          {isRunning ? "Pause" : "Play"}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}
