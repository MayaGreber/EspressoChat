import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useSocket } from "../socket/useSocket";

interface Message {
  text: string;
  sender: string;
  uniqueId: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ChatContextType {
  messages: Record<string, Message[]>;
  addMessage: (room: string, msg: Message) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: { name: string; uniqueId: string };
}) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [currentRoom, setCurrentRoom] = useState<string>("General");

  const addMessage = useCallback(
    (room: string, msg: Message) => {

      if (!msg.text) return;

      const messageWithOwnership = {
        ...msg,
        isOwn: msg.uniqueId === user.uniqueId,
      };

      setMessages((prev) => ({
        ...prev,
        [room]: [...(prev[room] || []), messageWithOwnership],
      }));
    },
    [user.uniqueId]
  );

  useEffect(() => {

    socket.emit("joinRoom", {
      roomName: currentRoom,
      user: user,
    });

    const handleRoomHistory = (
      data: { roomName: string; history: Message[] } | Message[] | unknown
    ) => {

      let roomName = currentRoom;
      let history: Message[] = [];

      if (Array.isArray(data)) {
        history = data as Message[];
      } else if (data && typeof data === "object" && "history" in data) {
        const dataObj = data as { roomName: string; history: Message[] };
        roomName = dataObj.roomName;
        history = dataObj.history || [];
      }

      const historyWithOwnership = history.map((msg: Message) => ({
        ...msg,
        isOwn: msg.uniqueId === user.uniqueId,
      }));

      setMessages((prev) => ({
        ...prev,
        [roomName]: historyWithOwnership,
      }));
    };

    const handleMessage = (data: Message & { roomName: string }) => {
      const { roomName, ...message } = data;
      addMessage(roomName, message);
    };

    const handleUserJoined = ({
      userName,
      uniqueId,
    }: {
      userName: string;
      uniqueId: string;
    }) => {
      console.log(`${userName} (${uniqueId}) joined the room`);
    };

    socket.on("roomHistory", handleRoomHistory);
    socket.on("message", handleMessage);
    socket.on("userJoined", handleUserJoined);

    return () => {
      socket.off("roomHistory", handleRoomHistory);
      socket.off("message", handleMessage);
      socket.off("userJoined", handleUserJoined);
    };
  }, [currentRoom, socket, addMessage, user]);

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, currentRoom, setCurrentRoom }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;