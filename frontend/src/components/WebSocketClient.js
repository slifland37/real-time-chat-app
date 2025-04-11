const WebSocketClient = (setMessages, clientId) => {
  const ws = new WebSocket(`ws://localhost:8000/ws/${clientId}`);

  ws.onmessage = (event) => {
    setMessages((prev) => [...prev, event.data]);
  };

  return {
    sendMessage: (message) => ws.send(message),
    dispose: () => {
      ws.close();
    }
  };
};

export default WebSocketClient;