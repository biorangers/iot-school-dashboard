"use client";

import { Paper, Typography, IconButton, Slider, Stack } from "@mui/material";
import { useState, useEffect } from "react";

import config from "@/config.json";

import {
  Pause,
  PlayArrow,
  SkipPrevious,
  SkipNext,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";

export default function MusicCard() {
  const [playing, setPlaying] = useState(false);
  const [radio, setRadio] = useState(config.radios[0]);
  const [audio, setAudio] = useState(() => null as unknown as HTMLAudioElement);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newAudio = new Audio(config.radios[0].url);
      newAudio.volume = volume / 100;
      setAudio(newAudio);
    }
  }, [audio, volume]);

  function handleChange(event: Event, newValue: number | number[]) {
    const newVolume = newValue as number;
    setVolume(newVolume);
    audio.volume = newVolume / 100; // Adjust volume directly
  }

  function changeRadio(direction: "next" | "previous") {
    audio.pause();

    let newRadio;
    if (direction === "next") {
      const nextRadioIndex = config.radios.indexOf(radio) + 1;
      newRadio =
        nextRadioIndex < config.radios.length
          ? config.radios[nextRadioIndex]
          : config.radios[0];
    } else {
      const previousRadioIndex = config.radios.indexOf(radio) - 1;
      newRadio =
        previousRadioIndex >= 0
          ? config.radios[previousRadioIndex]
          : config.radios[config.radios.length - 1];
    }

    audio.src = newRadio.url; // Update audio source
    setRadio(newRadio);

    audio.play();
    setPlaying(true);
  }

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
      <div className="flex justify-between items-center max-h-8">
        <IconButton onClick={() => changeRadio("previous")}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={play}>
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={() => changeRadio("next")}>
          <SkipNext />
        </IconButton>
        <Stack
          spacing={1}
          direction="row"
          sx={{ alignItems: "center", width: 200 }}
        >
          <VolumeDown />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={handleChange}
            color="info"
            valueLabelDisplay="auto"
          />
          <VolumeUp />
        </Stack>
      </div>
    </Paper>
  );
}
