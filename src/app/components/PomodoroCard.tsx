import { Paper, Typography } from "@mui/material";

export default function PomodoroCard() {
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
      <Typography variant="body2">00:25</Typography>
    </Paper>
  );
}
