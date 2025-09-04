import { useChat } from "../../context/chat/useChat";

const ChatHeader  = () => {
  const { currentRoom } = useChat();
    return (
        <div className="chat-header">
          <div className="chat-title"># {currentRoom}</div>
          <div className="chat-users">X members online</div>
        </div>
    );
};

export default ChatHeader ;