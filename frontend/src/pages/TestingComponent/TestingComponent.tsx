import React, { useState } from "react";
import axios from "axios";
export default function TestingComponent() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5015/webhooks/rest/webhook",
        {
        // phone number of the sender
        // message or the query
          sender: "123",
          message: message,
        }
      );

      if (res.data && res.data.length > 0) {
        setResponse(res.data[0].text);
      } else {
        setResponse("No response from the bot.");
      }
    } catch (error) {
      setResponse("Error: Unable to reach the ChatBot server.");

      console.error(error);
    }
  };
  return (
    <div>
      <h1>Rasa Chat</h1>
      <input
        type="text"
        value={message}
        
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
