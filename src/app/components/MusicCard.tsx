import { Paper, Typography, Button } from "@mui/material";

export default function MusicCard() {
  return (
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
  );
}
