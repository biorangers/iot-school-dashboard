import { Paper, Typography } from "@mui/material";

export default function AnnouncementCard() {
  return (
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
  );
}
