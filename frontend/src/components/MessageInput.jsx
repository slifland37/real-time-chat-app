import React, { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage(message);
      setMessage("");
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => { sendMessage(message); setMessage(""); }}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;