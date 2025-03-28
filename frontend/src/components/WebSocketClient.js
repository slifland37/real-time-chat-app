const WebSocketClient = (setMessages) => {
    const ws = new WebSocket("ws://localhost:8000/ws/123");
  
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  
    return {
      sendMessage: (message) => ws.send(message),
    };
  };
  
  export default WebSocketClient;