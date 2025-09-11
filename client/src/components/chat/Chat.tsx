import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import "./Chat.scss";

type ChatProps = {
  user: { name: string ; uniqueId: string}; 
};

export const Chat = ({ user }: ChatProps) => {
  return (
    <div className="app-container">
      <Sidebar user={user} />
      <div className="chat-container">
        <ChatHeader />
        <MessagesArea />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;