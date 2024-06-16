import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Chatbot_UI.css";
import { MarginIcon } from "@radix-ui/react-icons";
import usespeechToText from "./useSpeechToText.js";
interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const [chosenLanguage, setChosenLanguage] = useState<string>("en-US");
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    language,
    handleLanguageChange,
  } = usespeechToText(chosenLanguage);
  useEffect(() => {
    setCurrentMsg(transcript);
  }, [transcript]);
  const navigateTo = useNavigate();

  const sendMessage = async () => {
    if (currentMsg.trim() === "") return;
    try {
      const res = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          // phone number of the sender
          // message or the query
          sender: "919729712971",
          message: currentMsg,
        }
      );

      if (res.data && res.data.length > 0) {
        setMessages([
          ...messages,
          { sender: "user", text: currentMsg },
          { sender: "bot", text: res.data[0].text },
        ]);
      } else {
        setMessages([
          ...messages,
          { sender: "user", text: currentMsg },
          { sender: "bot", text: "No response from the bot." },
        ]);
      }
    } catch (error) {
      setMessages([
        ...messages,
        { sender: "user", text: currentMsg },
        { sender: "bot", text: "Error: Unable to reach the ChatBot server." },
      ]);
      setCurrentMsg("");
      navigateTo("/faq");
      console.error(error);
    }
    setCurrentMsg("");
  };

  const handleMicClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Mock function to simulate mic button action
    // alert("Mic button clicked!");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentMsg(event.target.value);
  };

  // const handleLanguageChange = (newLanguage: string) => {
  //   setLanguage(newLanguage);
  // };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <label>
          Select Language:
          <select className="select-language"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="mr-IN">Marathi</option>
          </select>
        </label>
      </div>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              textAlign: msg.sender === "user" ? "right" : "left",
              backgroundColor: msg.sender === "user" ? "#FAF5FC" : "#6633CC",
              color: msg.sender === "user" ? "#6633CC" : "#FAF5FC",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={currentMsg}
          onChange={handleInputChange}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening} // for touch devices
          onTouchEnd={stopListening} // for touch devices
          style={styles.button}
        >
          {isListening ? "Listening..." : "Mic"}
        </button>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    height: "90vh",
    maxWidth: "100vw",
    padding: "10px 0",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#6633CC",
    color: "#FAF5FC",
    borderRadius: "10px 10px 0 0",
  },
  chatWindow: {
    flex: 1,
    overflowY: "scroll" as const,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#FFFAEA",
    margin: "0 10px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    width: "100%",
    padding: "0 10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    color: "black",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  message: {
    maxWidth: "70%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "10px",
    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
  },
};

export default Chatbot;
