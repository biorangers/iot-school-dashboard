"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  Dialog,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Config } from "@/types/types";
import {
  parseHomeworks,
  parseLunchMenu,
  parseSchedule,
  parseSummary,
} from "@/utils/config-parse";

export default function VoiceAssistant({
  config,
  lunch,
}: {
  config: Config;
  lunch: string[];
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [waitingForCommand, setWaitingForCommand] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  const commands = [
    {
      command: ["ada", "ağda"],
      callback: async () => {
        resetTranscript();
        textToSpeech(`Efendim ${config.name}.`);
        setDialogOpen(true);
        setRecognizedText("Dinliyorum...");
        setWaitingForCommand(true);
      },
      matchInterim: true,
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
    {
      command: "özet",
      callback: async () => {
        if (waitingForCommand) {
          resetTranscript();
          setRecognizedText("Özetleniyor...");
          await parseSummary(config, lunch).then(async (summary: string) => {
            console.log(summary);
            await textToSpeech(summary);
          });
          setDialogOpen(false);
          setWaitingForCommand(false);
        }
      },
      matchInterim: true,
    },
    {
      command: "dersler",
      callback: async () => {
        if (waitingForCommand) {
          resetTranscript();
          setRecognizedText("Bugünkü dersler ne?");
          const text = parseSchedule(config.schedule);
          await textToSpeech(text);
          setDialogOpen(false);
          setWaitingForCommand(false);
        }
      },
    },
    {
      command: "yemek",
      callback: async () => {
        if (waitingForCommand) {
          resetTranscript();
          setRecognizedText("Yemekte ne var?");
          const text = parseLunchMenu(lunch);
          await textToSpeech(text);
          setDialogOpen(false);
          setWaitingForCommand(false);
        }
      },
    },
    {
      command: "ödevler",
      callback: async () => {
        if (waitingForCommand) {
          resetTranscript();
          setRecognizedText("Ödevlerim ne?");
          const text = parseHomeworks(config.homeworks);
          await textToSpeech(text);
          setDialogOpen(false);
          setWaitingForCommand(false);
        }
      },
    },
    {
      command: "kapat",
      callback: () => {
        resetTranscript();
        setDialogOpen(false);
        setWaitingForCommand(false);
      },
      matchInterim: true,
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5,
    },
  ];

  const {
    listening,
    browserSupportsSpeechRecognition,
    interimTranscript,
    resetTranscript,
  } = useSpeechRecognition({
    commands,
  });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.");
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
      language: "tr-TR",
    });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [browserSupportsSpeechRecognition]);

  if (!browserSupportsSpeechRecognition) {
    alert("Tarayıcınız konuşma tanıma özelliğini desteklemiyor.");
    return null;
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogContent sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {recognizedText}
        </Typography>
        {interimTranscript && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            {interimTranscript}
          </Typography>
        )}
        {listening && (
          <CircularProgress size={40} thickness={4} sx={{ mt: 2 }} />
        )}
      </DialogContent>
    </Dialog>
  );
}

const textToSpeech = async (text: string) => {
  const audioData = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!audioData.ok) {
    console.error("Failed to fetch audio data.");
    return;
  }

  const { audioString } = await audioData.json();

  const audio = new Audio(audioString);
  await new Promise<void>((resolve) => {
    // @ts-expect-error onended is not recognized by TS
    audio.onended = resolve;
    audio.play();
  });
};

/*
{
  "advancedVoiceOptions": {
    "lowLatencyJourneySynthesis": false
  },
  "audioConfig": {
    "audioEncoding": "MP3"
    
  },
  "voice": {
    "languageCode": "tr-TR",
    "name": "tr-TR-Standard-D",
    "ssmlGender": "FEMALE"
    
  },
  "input": {
    "text": "Ödevlerin: 14 Aralık Nesnelerin İnterneti, 20 Aralık Tasarım ve Uygulama. Bugünkü derslerin: 13.30'da Nesnelerin İnterneti. Yemekte Mercimek Çorbası, Pilav, tatlı var."
    
  }
}
  */
