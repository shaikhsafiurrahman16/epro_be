const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const userRoutes = require("../routes/userRoute");
const bookRoutes = require("../routes/bookRoute");
const authRoutes = require("../routes/authRoute");
const roomRoutes = require("../routes/roomRoute");
const serviceRoutes = require("../routes/serviceRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(400).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
