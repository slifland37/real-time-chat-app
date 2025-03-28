import React, { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => { sendMessage(message); setMessage(""); }}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;