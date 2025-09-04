import {GoogleIcon} from "./GoogleIcon";
import "./Login.scss";

type LoginProps = {
 onLogin: (user: { name: string }) => void;
};

export const Login = ({ onLogin }: LoginProps) => {
  const handleLogin = () => {
    const user = { name: "John Doe" }; 
    onLogin(user);
  };
  return (
    <div className="login-screen" id="loginScreen">
      <div className="login-card">
        <h2 className="login-title">Welcome to EspressoChat</h2>
        <p className="login-subtitle">
          Connect and chat in real-time with your team
        </p>
        <button className="login-btn" onClick={handleLogin}>
          <GoogleIcon /> Sign in with Google 
        </button>
      </div>
    </div>
  );
};

export default Login;
