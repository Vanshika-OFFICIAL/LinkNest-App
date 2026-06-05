const protect = require("../middleware/auth.middleware");
const express = require("express");

const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.patch("/profile", protect, updateProfile);
router.post(
  "/logout",
  protect,
  logout
);
module.exports = router;