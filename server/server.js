const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // הכתובת של הפרונט
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running ");
});

const inMemoryRooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room ${roomName}`);

    const history = inMemoryRooms[roomName] || [];
    socket.emit("roomHistory", history)
  });
  
  socket.on("message", ({ roomName, text }) => {
    if (!roomName || !text) return;

    if (!inMemoryRooms[roomName]) inMemoryRooms[roomName] = [];
    inMemoryRooms[roomName].push(text);

    io.to(roomName).emit("message", text);
    console.log(`Message in room ${roomName}:`, text);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
