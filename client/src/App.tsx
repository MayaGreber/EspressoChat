import { useState} from "react";
import { SocketProvider } from "./context/socket/SocketContext";
import { ChatProvider } from "./context/chat/ChatContext";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";

type User = {
  name: string;
  uniqueId: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
   <>
       {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <SocketProvider>
          <ChatProvider user={user}>
            <Chat user={user} />
          </ChatProvider>
        </SocketProvider>
      )}
   </>
  );
}

export default App;
