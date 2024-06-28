const express = require("express");
const {
  signup,
  login,
  logout,
  getAllUsers,
  getSearchedUser,
} = require("../controllers/user.controller");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/user", userAuth, getAllUsers);

router.get("/search", userAuth, getSearchedUser);

module.exports = router;
