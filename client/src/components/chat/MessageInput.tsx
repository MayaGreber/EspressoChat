import { useState } from "react";
import { useSocket } from "../../context/socket/useSocket";
import { useChat } from "../../context/chat/useChat";

const MessageInput = () => {
  const [text, setText] = useState("");
  const socket = useSocket();
  const { addMessage, currentRoom } = useChat();

  const sendMessage = () => {
    if (!text || !currentRoom) return;
    socket.emit("message", { roomName: currentRoom, text });
    addMessage(currentRoom, text);
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="message-input-area">
      <div className="input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button className="send-btn" onClick={sendMessage}>
          &#8679;
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
