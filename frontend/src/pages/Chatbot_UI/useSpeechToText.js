import { useState, useEffect, useCallback } from "react";

const useSpeechToText = (defaultLanguage = "en-US") => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcript + " ");
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      alert("Sorry, your browser does not support speech recognition.");
    }
  }, [language]);

  const startListening = useCallback(() => {
    setTranscript("");
    if (recognition) {
      recognition.lang = language;
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, language]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const handleLanguageChange = useCallback(
    (newLanguage) => {
      console.log(language);
      setLanguage(newLanguage);
      console.log(newLanguage);
      if (isListening) {
        stopListening();
        startListening();
      }
    },
    [isListening, startListening, stopListening]
  );

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    language,
    handleLanguageChange,
  };
};

export default useSpeechToText;
