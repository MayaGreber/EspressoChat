import { useState} from "react";
import { SocketProvider } from "./context/socket/SocketContext";
import { ChatProvider } from "./context/chat/ChatContext";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";

function App() {

  const [user, setUser] = useState<{ name: string } | null>(null);

  return (
   <>
       {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <SocketProvider>
          <ChatProvider>
            <Chat user={user} />
          </ChatProvider>
        </SocketProvider>
      )}
   </>
  );
}

export default App;
