import React, { useState, useEffect } from "react";
import WebSocketClient from "./components/WebSocketClient";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const App = () => {
  const [messages, setMessages] = useState([]);
  const ws = WebSocketClient(setMessages);

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <ChatWindow messages={messages} />
      <MessageInput sendMessage={ws.sendMessage} />
    </div>
  );
};

export default App;
