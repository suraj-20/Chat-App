const Conversation = require("../models/conversation.model");
const User = require("../models/user.model");

const createGroup = async (req, res) => {
  const { name, members } = req.body;
  const creatorId = req.user._id;
  try {
    const allMembers = [...new Set([...members, creatorId])];

    const users = await User.find({ _id: { $in: members } });
    if (users.length !== members.length) {
      return res.json(400).json({ message: "On or more user IDs are invalid" });
    }

    const group = new Conversation({
      name,
      participants: allMembers,
      isGroupChat: true,
    });

    await group.save();

    await User.updateMany(
      { _id: { $in: allMembers } },
      { $push: { group: group._id } }
    );

    const populateGroup = await group.populate(
      "participants",
      "username fullName profilePic"
    );

    res.status(201).json(populateGroup);
  } catch (error) {
    console.log("Error in creating Group :", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const leaveGroupConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      isGroupChat: true,
    });

    if (!conversation) {
      return res.status(400).json({ message: "Conversation not found." });
    }

    const isParticipant = conversation.participants.includes(userId);
    if (!isParticipant) {
      return res
        .status(400)
        .json({ message: "User is not a participant of this conversation" });
    }

    conversation.participants.pull(userId);

    await conversation.save();

    await User.findByIdAndUpdate(userId, { $pull: { group: conversationId } });

    res.status(200).json({ message: "You have left the group conversation" });
  } catch (error) {
    console.log("Error in leaving Group :", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// controllers/conversationController.js

const removeMemberFromGroup = async (req, res) => {
  try {
    const { conversationId, memberId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      isGroupChat: true,
    });

    if (!conversation) {
      return res.status(400).json({ message: "Conversation not found." });
    }

    // Check if the user making the request is a participant
    const isParticipant = conversation.participants.includes(userId);
    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a participant of this conversation." });
    }

    const isSelf = memberId === userId;
    if (!isSelf) {
      const isMemberToBeRemoved = conversation.participants.includes(memberId);
      if (!isMemberToBeRemoved) {
        return res.status(400).json({ message: "The member is not a participant of this conversation." });
      }
    }

    conversation.participants.pull(memberId);
    await conversation.save();

    await User.findByIdAndUpdate(memberId, { $pull: { groups: conversationId } });

    res.status(200).json({ message: "Member has been removed from the group conversation." });
  } catch (error) {
    console.log("Error in removing member from group:", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = {
  createGroup,
  leaveGroupConversation,
  removeMemberFromGroup,
};
