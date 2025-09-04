import { useChat } from "../../context/chat/useChat";

const MessagesArea = () => {

  const { messages, currentRoom } = useChat();

  return (
    <div className="messages-area">
     {messages[currentRoom]?.map((msg, index) => (
        <div key={index} className="message-text">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MessagesArea;
