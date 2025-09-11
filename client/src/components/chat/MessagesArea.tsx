import { useEffect, useRef } from "react";
import { useChat } from "../../context/chat/useChat";

const MessagesArea = () => {
  const { messages, currentRoom } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentRoom]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const roomMessages = messages[currentRoom] || [];

  return (
    <div className="messages-area">
      {roomMessages.length === 0 && (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          No messages in this room yet. 
          <br/>Start the conversation!
        </div>
      )}

      {roomMessages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.isOwn ? "own-message" : "other-message"}`}>
          <div className="message-header">
            <span className="user-id">{msg.sender}</span>
            <span className="timestamp"> ({formatTime(msg.timestamp)})</span>
          </div>
          <div className="message-text">{msg.text}</div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesArea;