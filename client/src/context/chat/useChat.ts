import { useContext } from "react";
import ChatContext from "./ChatContext";
import type { ChatContextType } from "./ChatContext";


export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context as ChatContextType;
};