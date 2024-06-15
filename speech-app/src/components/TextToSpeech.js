import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US'); // Default to English
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      setVoices(voices);
    };

    loadVoices();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = language;

      // Find a voice that matches the selected language
      const voice = voices.find((voice) => voice.lang === language);
      if (voice) {
        speech.voice = voice;
      } else {
        console.warn(`Voice for ${language} not found.`);
      }

      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <h2>Text to Speech</h2>
      <label>
        Select Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="te-IN">Marathi</option>
        </select>
      </label>
      <br />
      <textarea
        value={text}
        onChange={handleTextChange}
        rows="4"
        cols="50"
        placeholder="Enter text to speak..."
      />
      <br />
      <button onClick={speakText}>Speak</button>
    </div>
  );
};

export default TextToSpeech;


