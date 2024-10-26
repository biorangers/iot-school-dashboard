import { Paper, Typography } from "@mui/material";

import config from "@/config.json";

import dayjs from "dayjs";
import "dayjs/locale/tr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export default function HomeworkCard() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("tr");

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
      {(config.homeworks.length > 0 &&
        config.homeworks.map((item) => (
          <Typography variant="body2" key={item.id}>
            {item.name} - {dayjs(item.deadline).format("DD MMMM")}
          </Typography>
        ))) || <Typography variant="body2">Ödev yok</Typography>}
    </Paper>
  );
}
