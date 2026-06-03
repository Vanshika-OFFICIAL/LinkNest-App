const generateToken = require("../utils/generateToken");
const { loginUser } = require("../services/auth.service");
const { registerUser } = require("../services/auth.service");

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
    user: req.user,
  });
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
  logout
};
