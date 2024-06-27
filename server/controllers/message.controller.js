const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const { getReceiverSocketId, io } = require("../socket/socket");

module.exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation;
    if (receiverId.length === 24) {
      const isUser = await User.findById(receiverId);
      if (isUser) {
        conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
          isGroupChat: false,
        });

        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, receiverId],
            isGroupChat: false,
          });
        }
      }
    }

    if (!conversation) {
      conversation = await Conversation.findOne({
        _id: receiverId,
        participants: senderId,
        isGroupChat: true,
      });

      if (!conversation) {
        const { groupParticipants } = req.body;

        if (
          !groupParticipants ||
          !Array.isArray(groupParticipants) ||
          groupParticipants.length < 2
        ) {
          return res.status(400).json({ error: "Invalid group participants." });
        }

        conversation = await Conversation.create({
          participants: [senderId, ...groupParticipants],
          isGroupChat: true,
        });
      }
    }

    // let conversation = await Conversation.findOne({
    //   participants: { $all: [senderId, receiverId] },
    // });

    // if (!conversation) {
    //   conversation = await Conversation.create({
    //     participants: [senderId, receiverId],
    //   });
    // }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    if (conversation.isGroupChat) {
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== senderId.toString()) {
          const receiverSocketId = getReceiverSocketId(participantId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
          }
        }
      });
    } else {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage :", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const userId = req.user._id;

    let conversation;

    conversation = await Conversation.findOne({
      _id: chatId,
      participants: userId,
    }).populate({
      path: "messages",
      populate: { path: "senderId", select: "username" },
    });

    if (conversation && conversation.isGroupChat) {
      conversation = await conversation.populate("participants", "username");
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [userId, chatId] },
        isGroupChat: false,
      }).populate("messages");
    }

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in sendMessage :", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
