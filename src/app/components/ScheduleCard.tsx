import { Paper, Typography } from "@mui/material";

export default function ScheduleCard() {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#d1c4e9",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Ders Programı</Typography>
      <Typography variant="body2">10:00 - 11:30 Algoritmalar</Typography>
      <Typography variant="body2">13:00 - 14:30 Veri Yapıları</Typography>
    </Paper>
  );
}
