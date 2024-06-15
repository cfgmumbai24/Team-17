import React from "react";
import useSpeechToText from "./useSpeechToText";

const Hehe = () => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    language,
    handleLanguageChange,
  } = useSpeechToText("en-US");
  
  return (
    <div>
      <h2>Speech to Text</h2>
      <label>
        Select Language:
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="mr-IN">Marathi</option>
        </select>
      </label>
      <br />
      <button
        onMouseDown={startListening}
        onMouseUp={stopListening}
        onTouchStart={startListening} // for touch devices
        onTouchEnd={stopListening} // for touch devices
      >
        {isListening ? "Listening..." : "Press and Hold to Talk"}
      </button>
      <div>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default Hehe;
