require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// Routes
const connectMongoDB = require("./config/mongoDB");
const userRoutes = require("./routes/user.route");
const messageRoutes = require("./routes/message.route");
const { app, server } = require("./socket/socket");

app.get("/", (req, res) => {
  return res.send("Hello World");
});

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  connectMongoDB(process.env.MONGO_URL);
  console.log(`Server is listening on port: ${PORT}`);
});
