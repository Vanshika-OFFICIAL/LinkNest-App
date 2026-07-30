const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { loginUser,
  registerUser,
  changePassword,
  forgotPassword,
  resetPassword,
 } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        avatarPublicId: user.avatarPublicId,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      avatarPublicId: req.user.avatarPublicId,
      createdAt: req.user.createdAt,
    },
  });
};

const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(req.user._id);
      console.log("BODY:", req.body);
console.log("FILE:", req.file);
console.log("ENV:", process.env.CLOUDINARY_CLOUD_NAME);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;
if (req.file) {

  if (user.avatarPublicId) {
    await cloudinary.uploader.destroy(user.avatarPublicId);
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "linknest/profile",
  });

  console.log("RESULT:", result); 
  
  user.avatar = result.secure_url;
  user.avatarPublicId = result.public_id;

  if (fs.existsSync(req.file.path)) {
  fs.unlinkSync(req.file.path);
}
}
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePassword =
  async (req, res) => {
    try {
      await changePassword(
        req.user._id,
        req.body.currentPassword,
        req.body.newPassword
      );

      res.status(200).json({
        success: true,
        message:
          "Password updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await resetPassword(
      token,
      password
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//logout user (for frontend to clear token)
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
  forgotPasswordController,
  resetPasswordController,
  logout
};
