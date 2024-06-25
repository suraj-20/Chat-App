const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization;
    // console.log("token in userAuth", token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decode._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in user-authentication ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = userAuth;
