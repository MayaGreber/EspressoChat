import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface ChatContextType {
  messages: Record<string, string[]>;
  addMessage:  (room: string, msg: string) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Record<string, string[]>>({});
  const [currentRoom, setCurrentRoom] = useState<string>("General");

  const addMessage = (room: string, msg: string) => {
     setMessages((prev) => ({
    ...prev,
    [room]: [...(prev[room] || []), msg],
  }));
  };

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, currentRoom, setCurrentRoom }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
