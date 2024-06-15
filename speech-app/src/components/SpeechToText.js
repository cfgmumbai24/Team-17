import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [language, setLanguage] = useState('en-US'); // Default to English

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcript + ' ');
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      alert('Sorry, your browser does not support speech recognition.');
    }
  }, [language]);

  const startListening = () => {
    if (recognition) {
      recognition.lang = language;
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    if (isListening) {
      stopListening();
      startListening();
    }
  };

  return (
    <div>
      <h2>Speech to Text</h2>
      <label>
        Select Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="mr-IN">Marathi</option>
        </select>
      </label>
      <br />
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;


