const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  console.log("A New User has beed Connected", socket.id);
});

app.get("/", (req, res) => {
  return res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// socket.on("user-message", (message) => {
//     io.emit("message", message);
//     console.log("A new user Message", message);
//   });
