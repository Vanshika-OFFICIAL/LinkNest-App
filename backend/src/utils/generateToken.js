const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  console.log(process.env.JWT_SECRET);

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
    }
  );
};

module.exports = generateToken;