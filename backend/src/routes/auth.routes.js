const express = require("express");
const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/multer");

const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  updatePassword,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password/:token", resetPasswordController);

router.get("/me", protect, getMe);

// Update Profile (Image + Name + Email)
router.patch(
  "/profile",
  (req, res, next) => {
    console.log("🔥 Route Hit");
    next();
  },
  protect,
  upload.single("profileImage"),
  updateProfile
);

router.patch(
  "/change-password",
  protect,
  updatePassword
);

router.post(
  "/logout",
  protect,
  logout
);

module.exports = router;