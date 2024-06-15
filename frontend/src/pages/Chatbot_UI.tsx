import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'user', text: 'What is Ppf' },
    { sender: 'bot', text: 'NHI PATA' },
    { sender: 'user', text: 'kyu' },
    { sender: 'bot', text: 'meri marzi' },
  ]);
  const [text, setText] = useState<string>('');

  const handleSend = () => {
    if (text.trim()) {
      const newMessage: Message = { sender: 'user', text };
      setMessages([...messages, newMessage]);

      // Simulating a bot response
      setTimeout(() => {
        const botResponse: Message = { sender: 'bot', text: 'Bot reply to: ' + text };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);

      setText('');
    }
  };

  const handleMicClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Mock function to simulate mic button action
    alert('Mic button clicked!');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end',
              backgroundColor: msg.sender === 'user' ? '#FAF5FC' : '#6633CC',
              color: msg.sender === 'user' ? '#6633CC' : '#FAF5FC',
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
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message"
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
        <button onClick={handleMicClick} style={styles.button}>Mic</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    height: '90vh',
    width: '100vw',
    padding: '10px 0',
  },
  chatWindow: {
    flex: 1,
    overflowY: 'scroll' as const,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#FFFAEA',
    margin: '0 10px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    width: '100%',
    padding: '0 10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    color: 'black',
  },
  button: {
    marginLeft: '10px',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '10px',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  },
};

export default Chatbot;
