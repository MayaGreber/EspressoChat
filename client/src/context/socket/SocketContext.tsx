import { createContext } from "react";
import type { ReactNode } from "react";
import { Socket } from "socket.io-client";
import { socket } from "./socket";

const SocketContext = createContext<Socket>(socket);

export const SocketProvider = ({ children }: { children: ReactNode }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export default SocketContext;