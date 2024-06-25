const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (user, res) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "production",
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
