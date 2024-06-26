const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.URL,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("connect", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = {
  app,
  server,
  io,
  getReceiverSocketId,
};
