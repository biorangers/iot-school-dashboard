import { Paper, Typography } from "@mui/material";

export default function HomeworkCard() {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#ffcccb",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Ödevler</Typography>
      <Typography variant="body2">Nesnelerin İnt. - 24 Ekim</Typography>
      <Typography variant="body2">Tasarım Uyg. - 25 Kasım</Typography>
    </Paper>
  );
}
