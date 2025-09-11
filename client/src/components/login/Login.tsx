import { useState } from "react";
import { GoogleIcon } from "./GoogleIcon";
import "./Login.scss";

type LoginProps = {
  onLogin: (user: { name: string; uniqueId: string }) => void;
};

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) {
      alert("please enter a valid username");
      return;
    }
    
    const uniqueId = `${username}_${Math.random().toString(36).substring(2, 8)}`;
    
    const user = { 
      name: username.trim(),
      uniqueId: uniqueId
    };
    onLogin(user);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-screen" id="loginScreen">
      <div className="login-card">
        <h2 className="login-title">Welcome to EspressoChat</h2>
        <p className="login-subtitle">
          Connect and chat in real-time with your team
        </p>
        
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="username-input"
            maxLength={20}
          />
        </div>
        
        <button className="login-btn" onClick={handleLogin}>
          <GoogleIcon /> Sign in with Google 
        </button>
      </div>
    </div>
  );
};

export default Login;