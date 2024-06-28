const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateTokenAndSetCookie = require("../utils/generateToken");
const Conversation = require("../models/conversation.model");

module.exports.signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match." });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      const token = generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        sucess: true,
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        gender: newUser.gender,
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in user signup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateTokenAndSetCookie(user._id, res);
    // console.log(token);

    res.status(200).json({
      sucess: true,
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      gender: user.gender,
      token,
    });
  } catch (error) {
    console.log("Error in user login: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ sucess: true });
  } catch (error) {
    console.log("Error in user logout:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    const groupConversations = await Conversation.find({
      participants: loggedInUserId,
      isGroupChat: true,
    })
      .populate("participants", "username fullName profilePic")
      .select("name participants isGroupChat");

    // console.log({ users: filteredUsers, groups: groupConversations });

    res.status(200).json({ filteredUsers, groupConversations });
  } catch (error) {
    console.log("Error in getting user: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getSearchedUser = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username _id");

    res.status(200).json({ users });
  } catch (error) {
    console.log("Error in getting user: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
