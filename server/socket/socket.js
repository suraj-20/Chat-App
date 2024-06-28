const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    // origin: process.env.URL,
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

  socket.on("joinGroup", ({ groupId }) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  socket.on("sendMessage", async ({ conversationId, senderId, message }) => {
    try {
      const newMessage = new Message({
        senderId,
        receiverId: conversationId,
        message,
      });
      await newMessage.save();

      const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        { $push: { message: newMessage._id } },
        { new: true }
      );

      await conversation.save();

      io.to(conversationId).emit("newMessage", newMessage);
    } catch (error) {
      console.log("Error in sendMessage: ", error.message);
    }
  });

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
