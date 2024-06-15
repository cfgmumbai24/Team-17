import React from 'react';
import TextToSpeech from './components/TextToSpeech';
import SpeechToText from './components/SpeechToText';

const App = () => {
  return (
    <div>
      <h1>Speech App</h1>
      <TextToSpeech />
      <SpeechToText />
    </div>
  );
};

export default App;

