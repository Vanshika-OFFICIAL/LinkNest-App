const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateResetToken = require("../utils/generateResetToken");
const sendEmail = require("./emailService");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};
const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user =
    await User.findById(userId);

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const isMatch =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Current password incorrect"
    );
  }

  user.password =
    await bcrypt.hash(
      newPassword,
      10
    );

  await user.save();

  return user;
};
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("No account found with this email.");
  }

  const { resetToken, hashedToken } = generateResetToken();
    user.resetPasswordToken = hashedToken;

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const html = `
    <h2>Reset Your LinkNest Password</h2>
    <p>You requested a password reset.</p>
    <p>Click the button below to reset your password:</p>

    <a href="${resetUrl}"
       style="
         display:inline-block;
         padding:12px 20px;
         background:#2563eb;
         color:#fff;
         text-decoration:none;
         border-radius:6px;
       ">
       Reset Password
    </a>

    <p>This link will expire in 15 minutes.</p>

    <p>If you didn't request this, please ignore this email.</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "Reset Your LinkNest Password",
    html,
  });

  return {
    message: "Password reset link sent successfully.",
  };
};

const resetPassword = async (token, password) => {
  // Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Find user with valid token
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new Error("Invalid or expired reset token.");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password
  user.password = hashedPassword;

  // Clear reset token
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return {
    message: "Password reset successful.",
  };
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};