const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const userAuth = require("../middleware/userAuth");
const {
  createGroup,
  leaveGroupConversation,
  removeMemberFromGroup,
} = require("../controllers/group.controller");

const router = express.Router();

router.post("/send/:id", userAuth, sendMessage);
router.get("/:id", userAuth, getMessages);
router.post("/createGroup", userAuth, createGroup);
router.post("/leave-group/:conversationId", userAuth, leaveGroupConversation);
router.post(
  "/:conversationId/remove/:memberId",
  userAuth,
  removeMemberFromGroup
);

module.exports = router;
