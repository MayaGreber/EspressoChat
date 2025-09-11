const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running ");
});

const inMemoryRooms = {};
const connectedUsers = {}; 

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomName, user }) => {
    socket.join(roomName);
    
    connectedUsers[socket.id] = {
      name: user.name,
      uniqueId: user.uniqueId,
      currentRoom: roomName
    };

    const history = inMemoryRooms[roomName] || [];
    socket.emit("roomHistory", { roomName, history });

    socket.to(roomName).emit("userJoined", {
      userName: user.name,
      uniqueId: user.uniqueId
    });
  });
  
  socket.on("message", ({ roomName, text }) => {
    if (!roomName || !text) {
      return;
    }

    const userInfo = connectedUsers[socket.id];
    if (!userInfo) {
      return;
    }

    if (!inMemoryRooms[roomName]) inMemoryRooms[roomName] = [];

    const messageData = {
      text,
      sender: userInfo.name,
      uniqueId: userInfo.uniqueId,
      timestamp: new Date().toISOString(),
    };


    inMemoryRooms[roomName].push(messageData);

    const dataToEmit = {
      roomName,
      ...messageData
    };

    io.to(roomName).emit("message", dataToEmit);

  });

  socket.on("disconnect", () => {
    const userInfo = connectedUsers[socket.id];
    if (userInfo) {
      delete connectedUsers[socket.id];
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
});