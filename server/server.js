// 1. מייבאים ספריות
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// 2. יוצרים אפליקציית אקספרס
const app = express();

// 3. יוצרים שרת HTTP
const server = http.createServer(app);

// 4. יוצרים אובייקט של Socket.IO שמחובר לשרת
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // הכתובת של הפרונט
    methods: ["GET", "POST"],
  },
});

// 5. ראוט בסיסי
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// storing messages in memory by room
const inMemoryRooms = {};

//Listening for Socket.IO connections 
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join a room
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room ${roomName}`);

    // send room messages history to user
    const history = inMemoryRooms[roomName] || [];
    socket.emit("roomHistory", history)
  });



// קבלת הודעה מהלקוח
  socket.on("message", ({ roomName, text }) => {
    if (!roomName || !text) return;

    // שמירת ההודעה בזיכרון לפי חדר
    if (!inMemoryRooms[roomName]) inMemoryRooms[roomName] = [];
    inMemoryRooms[roomName].push(text);

    // שליחת ההודעה לכל המשתמשים שבחדר
    io.to(roomName).emit("message", text);
    console.log(`Message in room ${roomName}:`, text);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 8. הפעלת השרת
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});