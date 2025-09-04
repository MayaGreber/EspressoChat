import { useEffect } from "react";
import { useSocket } from "../../context/socket/useSocket";
import { useChat } from "../../context/chat/useChat";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import "./Chat.scss";

type ChatProps = {
  user: { name: string }; 
};

export const Chat = ({ user }: ChatProps) => {
  const socket = useSocket();
  const { addMessage } = useChat();

 useEffect(() => {
    socket.emit("join", user.name);

    socket.on("message", ({ roomName, text }: { roomName: string; text: string }) => {
      addMessage(roomName, text);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, addMessage, user.name]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="chat-container">
        <ChatHeader />
        <MessagesArea />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
