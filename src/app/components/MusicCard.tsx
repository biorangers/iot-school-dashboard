"use client";

import {
  Paper,
  Typography,
  IconButton,
  Slider,
  Stack,
  Skeleton,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";

import {
  Pause,
  PlayArrow,
  SkipPrevious,
  SkipNext,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";

import { Radio } from "@/types/types";

export default function MusicCard({
  radios,
  loading,
}: {
  radios: Radio[];
  loading: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [radio, setRadio] = useState(radios[0]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (!loading && radios.length > 0 && !radio) {
      setRadio(radios[0]);
    }
  }, [loading, radios, radio]);

  useEffect(() => {
    if (typeof window !== "undefined" && !audio && !loading) {
      const newAudio = new Audio(radios[0].url);
      newAudio.volume = volume / 100;
      setAudio(newAudio);

      return () => {
        newAudio.pause();
        newAudio.src = ""; // Hafıza sızıntısını önlemek için
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume, audio]);

  function handleChange(event: Event, newValue: number | number[]) {
    const newVolume = newValue as number;
    setVolume(newVolume);
    audio!.volume = newVolume / 100; // Adjust volume directly
  }

  function changeRadio(direction: "next" | "previous") {
    audio!.pause();

    let newRadio;
    if (direction === "next") {
      const nextRadioIndex = radios.indexOf(radio) + 1;
      newRadio =
        nextRadioIndex < radios.length ? radios[nextRadioIndex] : radios[0];
    } else {
      const previousRadioIndex = radios.indexOf(radio) - 1;
      newRadio =
        previousRadioIndex >= 0
          ? radios[previousRadioIndex]
          : radios[radios.length - 1];
    }

    audio!.src = newRadio.url; // Update audio source
    setRadio(newRadio);

    audio!.play();
    setPlaying(true);
  }

  function play() {
    if (playing) {
      setPlaying(false);
      audio!.pause();
    } else {
      setPlaying(true);
      audio!.play();
    }
  }

  const theme = useTheme();
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: theme.palette.cards.music.bg,
        color: theme.palette.cards.music.text,
        borderRadius: 6,
        height: "100%",
      }}
    >
      {loading ? (
        <div className="flex flex-col gap-0">
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={200} height={30} />
        </div>
      ) : (
        <div>
          <Typography variant="h6">{radio?.name}</Typography>
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
        </div>
      )}
    </Paper>
  );
}
