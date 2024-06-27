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

    res.status(201).json(group);
  } catch (error) {
    console.log("Error in creating Group :", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// const getGroupMessages = async (req, res) => {
//   try {
//     const { id: groupId } = req.params;
//     const userId = req.user._id;

//     // console.log("Groupid:", groupId, "userid:", userId);
//     // Check if the user is a participant in the group
//     const conversation = await Conversation.findOne({
//       _id: groupId,
//       participants: userId,
//       isGroupChat: true,
//     })
//       .populate({
//         path: "messages",
//         populate: { path: "senderId", select: "username" },
//       })
//       .populate("participants", "username");
//     // console.log("conversation", conversation);

//     if (!conversation) {
//       return res
//         .status(404)
//         .json({ message: "Group not found or user not a participant." });
//     }

//     const messages = conversation.messages;

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getting group messages:", error.message);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// };

module.exports = {
  createGroup,
};
