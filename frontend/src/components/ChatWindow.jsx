import React from "react";

const ChatWindow = ({ messages }) => (
  <div>
    {messages.map((msg, idx) => (
      <p key={idx}>{msg}</p>
    ))}
  </div>
);

export default ChatWindow;