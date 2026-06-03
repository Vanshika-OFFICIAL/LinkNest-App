const linkRoutes = require("./routes/link.routes");
const collectionRoutes = require("./routes/collection.routes");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/links", linkRoutes);
// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LinkNest API Running 🚀",
  });
});
const dashboardRoutes =
require("./routes/dashboard.routes");

app.use(
  "/api/dashboard",
  dashboardRoutes
);
module.exports = app;