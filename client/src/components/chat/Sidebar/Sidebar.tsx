import { useState } from "react";
import { useChat } from "../../../context/chat/useChat";
import { useSocket } from "../../../context/socket/useSocket";
import "./Sidebar.scss";

type SidebarProps = {
  user: { name: string; uniqueId: string };
};

const Sidebar = ({ user }: SidebarProps) => {
  const [rooms, setRooms] = useState([
    "General",
    "Development",
    "Design",
    "Random",
  ]);

  const [newRoomName, setNewRoomName] = useState("");
  const socket = useSocket();
  const { currentRoom, setCurrentRoom } = useChat();

  const joinRoom = (roomName: string) => {
    setCurrentRoom(roomName);
    socket.emit("joinRoom", { roomName, user });
  };

  const handleNewRoom = () => {
    if (!newRoomName) return;
    setRooms((prev) => [...prev, newRoomName]);
    joinRoom(newRoomName);
    setNewRoomName("");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="online-status">● Online</div>
          </div>
        </div>
        <div className="new-room-section">
          <input
            type="text"
            placeholder="Add new room"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button className="new-room-btn" onClick={handleNewRoom}>
            &#43;
          </button>
        </div>
      </div>
      <div className="rooms-section">
        <div className="section-title">Active Rooms</div>
        {rooms.map((room) => (
          <div
            key={room}
            className={`room-item ${currentRoom === room ? "active" : ""}`}
            onClick={() => joinRoom(room)}
          >
            <span className="room-name"># {room}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;