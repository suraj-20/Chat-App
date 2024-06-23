const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.post("/send/:id", userAuth, sendMessage);
router.get("/:id", userAuth, getMessages);

module.exports = router;
