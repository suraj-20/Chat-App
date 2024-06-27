const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const userAuth = require("../middleware/userAuth");
const { createGroup } = require("../controllers/group.controller");

const router = express.Router();

router.post("/send/:id", userAuth, sendMessage);
router.get("/:id", userAuth, getMessages);
router.post("/createGroup", userAuth, createGroup);
// router.get("/group/:id", userAuth, getGroupMessages);

module.exports = router;
