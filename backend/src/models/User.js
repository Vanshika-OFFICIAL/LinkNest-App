const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
    avatar: {
      type: String,
      default: "",
    },

avatarPublicId: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
