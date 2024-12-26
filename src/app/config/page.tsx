"use client";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Stack,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import config from "@/config.json";

import { Homework, Radio, Schedule } from "@/types/types";

export default function ConfigEditor() {
  const [name, setName] = useState<string>();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [city, setCity] = useState<string>();
  const [openweathermapApiKey, setOpenweathermapApiKey] = useState<string>();

  // Update useEffect to load from localStorage
  useEffect(() => {
    async function fetchData() {
      const savedConfig = await fetch("/api/database/?key=1").then((res) =>
        res.json()
      );
      if (savedConfig) {
        const parsed = savedConfig;
        setName(parsed.name);
        setCity(parsed.city);
        setOpenweathermapApiKey(parsed.openweathermapApiKey);
        setHomeworks(
          parsed.homeworks.map((item: Homework, i: number) => ({
            ...item,
            id: i.toString(),
          }))
        );
        setSchedule(
          parsed.schedule.map((item: Schedule, i: number) => ({
            ...item,
            id: i.toString(),
          }))
        );
        setRadios(
          parsed.radios.map((item: Radio, i: number) => ({
            ...item,
            id: i.toString(),
          }))
        );
      } else {
        // Fallback to config.json
        setName(config.name);
        setHomeworks(
          config.homeworks.map((item, i) => ({ ...item, id: i.toString() }))
        );
        setSchedule(
          config.schedule.map((item, i) => ({ ...item, id: i.toString() }))
        );
        setRadios(
          config.radios.map((item, i) => ({ ...item, id: i.toString() }))
        );
      }
    }
    fetchData();
  }, []);

  // Update handleSave to use localStorage
  const handleSave = async () => {
    try {
      const newConfig = {
        name,
        schedule,
        homeworks,
        radios,
        city,
        openweathermapApiKey,
      };

      await fetch("/api/database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: 1, value: newConfig }),
      });
      alert("Değişiklikler kaydedildi");
    } catch (error) {
      console.error("Save error:", error);
      alert("Kaydetme sırasında bir hata oluştu");
    }
  };
  // Homework functions
  const addHomework = () => {
    const newHomework: Homework = {
      id: homeworks.length.toString(),
      name: "",
      dueDate: "",
      description: "",
    };
    setHomeworks([...homeworks, newHomework]);
  };

  // Schedule functions
  const addSchedule = () => {
    const newItem: Schedule = {
      id: schedule.length.toString(),
      day: "",
      time: "",
      subject: "",
    };
    setSchedule([...schedule, newItem]);
  };

  // Radio functions
  const addRadio = () => {
    const newRadio: Radio = {
      id: radios.length.toString(),
      name: "",
      url: "",
    };
    setRadios([...radios, newRadio]);
  };

  return name ? (
    <Box
      sx={{ padding: 4, maxWidth: 800, margin: "0 auto", minHeight: "100vh" }}
    >
      <Typography variant="h4" gutterBottom>
        Konfigürasyon
      </Typography>

      <TextField
        fullWidth
        label="İsim"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 4 }}
      />

      <TextField
        fullWidth
        label="Şehir"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Schedule Section */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <h2>Ders Programı</h2>
          <Button startIcon={<Add />} variant="contained" onClick={addSchedule}>
            Ders Ekle
          </Button>
        </Stack>

        {schedule.map((item) => (
          <Card key={item.id + "schedule"} sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Ders"
                value={item.subject}
                onChange={(e) =>
                  setSchedule(
                    schedule.map((s) =>
                      s.id === item.id ? { ...s, subject: e.target.value } : s
                    )
                  )
                }
              />
              <FormControl fullWidth>
                <InputLabel>Gün</InputLabel>
                <Select
                  value={item.day}
                  label="Day"
                  onChange={(e) =>
                    setSchedule(
                      schedule.map((s) =>
                        s.id === item.id ? { ...s, day: e.target.value } : s
                      )
                    )
                  }
                >
                  {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"].map(
                    (day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Saat"
                value={item.time}
                onChange={(e) =>
                  setSchedule(
                    schedule.map((s) =>
                      s.id === item.id ? { ...s, time: e.target.value } : s
                    )
                  )
                }
              />

              <IconButton
                color="error"
                onClick={() =>
                  setSchedule(schedule.filter((s) => s.id !== item.id))
                }
              >
                <Delete />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Box>

      {/* Homeworks Section */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <h2>Ödevler</h2>
          <Button startIcon={<Add />} variant="contained" onClick={addHomework}>
            Ödev Ekle
          </Button>
        </Stack>

        {homeworks.map((homework) => (
          <Card key={homework.id + "homework"} sx={{ p: 2, mb: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Ödev Başlığı"
                  value={homework.name}
                  onChange={(e) =>
                    setHomeworks(
                      homeworks.map((h) =>
                        h.id === homework.id
                          ? { ...h, name: e.target.value }
                          : h
                      )
                    )
                  }
                />
                <TextField
                  fullWidth
                  label="Teslim Tarihi"
                  value={homework.dueDate}
                  onChange={(e) =>
                    setHomeworks(
                      homeworks.map((h) =>
                        h.id === homework.id
                          ? { ...h, dueDate: e.target.value }
                          : h
                      )
                    )
                  }
                />
                <IconButton
                  color="error"
                  onClick={() =>
                    setHomeworks(homeworks.filter((h) => h.id !== homework.id))
                  }
                >
                  <Delete />
                </IconButton>
              </Stack>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Açıklama"
                value={homework.description}
                onChange={(e) =>
                  setHomeworks(
                    homeworks.map((h) =>
                      h.id === homework.id
                        ? { ...h, description: e.target.value }
                        : h
                    )
                  )
                }
              />
            </Stack>
          </Card>
        ))}
      </Box>

      {/* Radios Section */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <h2>Radyo</h2>
          <Button startIcon={<Add />} variant="contained" onClick={addRadio}>
            Radyo Ekle
          </Button>
        </Stack>

        {radios.map((radio) => (
          <Card key={radio.id + "radio"} sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Radyo Adı"
                value={radio.name}
                onChange={(e) =>
                  setRadios(
                    radios.map((r) =>
                      r.id === radio.id ? { ...r, name: e.target.value } : r
                    )
                  )
                }
              />
              <TextField
                fullWidth
                label="URL"
                value={radio.url}
                onChange={(e) =>
                  setRadios(
                    radios.map((r) =>
                      r.id === radio.id ? { ...r, url: e.target.value } : r
                    )
                  )
                }
              />
              <IconButton
                color="error"
                onClick={() =>
                  setRadios(radios.filter((r) => r.id !== radio.id))
                }
              >
                <Delete />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Box>

      <TextField
        fullWidth
        //password
        type="password"
        label="OpenWeatherMap API Key"
        value={openweathermapApiKey}
        onChange={(e) => setOpenweathermapApiKey(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
        Kaydet
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        padding: 4,
        maxWidth: 800,
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Skeleton variant="text" width="100%" height={40} />

      <Skeleton variant="rounded" width="100%" height={200} />

      <Skeleton variant="text" width="100%" height={40} />

      <Skeleton variant="rounded" width="100%" height={200} />

      <Skeleton variant="text" width="100%" height={40} />

      <Skeleton variant="rounded" width="100%" height={300} />

      <Skeleton variant="text" width="100%" height={40} />

      <Skeleton variant="rounded" width="100%" height={300} />
    </Box>
  );
}
