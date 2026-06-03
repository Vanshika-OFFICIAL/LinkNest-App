const express = require("express");

const protect = require("../middleware/auth.middleware");

const {
  stats,
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get(
  "/stats",
  protect,
  stats
);

module.exports = router;