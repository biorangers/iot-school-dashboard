"use client";

import React, { useEffect, useState } from "react";

export default function VoiceAssistant() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const SpeechRecognition = // @ts-expect-error Property 'SpeechRecognition' does not exist on type 'Window' but it is supported in most browsers
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tarayıcı ses tanımayı desteklemiyor.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR"; // Dil ayarları ('tr-TR' Türkçe için)
    recognition.continuous = true; // Sürekli dinleme
    recognition.interimResults = false; // Geçici sonuçları gösterme

    // Tanıma başladığında
    recognition.onstart = () => {
      console.log("Listening...");
    };

    // Kullanıcı konuşmayı durdurduğunda
    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      console.log("Heard: ", transcript);
      speak("Hello, I'm your voice assistant. How can I help you today?");
      if (transcript.toLowerCase().startsWith("asistan")) {
        // pop "asistan" from the string
        const command = transcript.slice(8).trim().toLowerCase();

        console.log("Command: ", command);
        setMessage(command);
        if (command === "müzik çal") {
          playLofi();
        }
      }
    };

    // Hataları yakala
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        recognition.stop();
        recognition.start();
      }
    };

    // Tanımayı başlat
    recognition.start();

    // Component unmount olduğunda tanımayı durdur
    return () => {
      recognition.stop();
    };
  }, []);
  const speak = (text: string) => {
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    if (SpeechSynthesisUtterance) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      console.log(utterance);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tarayıcı konuşma sentezini desteklemiyor.");
    }
  };
  const playLofi = () => {
    // Örneğin bir ses oynatıcıyı çalıştır

    const audio = new Audio("https://play.streamafrica.net/lofiradio");
    audio.play();
  };

  return <div className="hidden"></div>;
}
