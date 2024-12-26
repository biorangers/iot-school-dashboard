import { Paper, Typography, useTheme } from "@mui/material";

import dayjs from "dayjs";
import "dayjs/locale/tr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Homework } from "@/types/types";
import Loading from "./Loading";

export default function HomeworkCard({
  homeworks,
  loading,
}: {
  homeworks: Homework[];
  loading: boolean;
}) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("tr");

  const theme = useTheme();

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: theme.palette.cards.homework.bg,
        color: theme.palette.cards.homework.text,
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">Ödevler</Typography>
      {loading && <Loading />}
      {homeworks.length > 0 &&
        homeworks.map((item: Homework) => (
          <Typography
            variant="body2"
            key={item.id + "homework"}
            onClick={() => alert(item.description)}
            sx={{ cursor: "pointer", margin: "4px 0" }}
          >
            {item.name} - {item.dueDate}
          </Typography>
        ))}
    </Paper>
  );
}
