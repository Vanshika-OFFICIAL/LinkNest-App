const {
  getStats,
} = require("../services/dashboard.service");

const stats = async (req, res) => {
  try {
    const data = await getStats(
      req.user._id
    );

    res.status(200).json({
      success: true,
      stats: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  stats,
};