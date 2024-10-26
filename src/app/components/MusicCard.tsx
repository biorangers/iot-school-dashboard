"use client";

import { Paper, Typography, Button } from "@mui/material";
import { useState } from "react";

import config from "@/config.json";

// source: https://gist.github.com/Xifax/d330907d9ff0c059612b9c6161650b24

export default function MusicCard() {
  const [playing, setPlaying] = useState(false);
  const [radio] = useState(config.radios[0]);
  const [audio] = useState(new Audio(radio.url));

  function play() {
    if (playing) {
      setPlaying(false);
      audio.pause();
    } else {
      setPlaying(true);
      audio.play();
    }
  }

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#d1c4e9",
        borderRadius: 6,
        height: "100%",
      }}
    >
      <Typography variant="h6">{radio.name}</Typography>
      <Button variant="contained" onClick={play}>
        {playing ? "Stop" : "Play"}
      </Button>
    </Paper>
  );
}
