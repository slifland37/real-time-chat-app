import React, { useState, useEffect } from "react";
import WebSocketClient from "./components/WebSocketClient";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [wsClient, setWsClient] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/client-id")
      .then((res) => res.json())
      .then((data) => {
        console.log("Client ID: ", data.clientId);
        const ws = WebSocketClient(setMessages, data.clientId);
        setWsClient(ws);
      });
    // cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (wsClient) {
        wsClient.dispose();
      }
    }
  }, []);

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <ChatWindow messages={messages} />
      {wsClient && <MessageInput sendMessage={wsClient.sendMessage} />}
    </div>
  );
};

export default App;