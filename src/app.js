const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

// CORS Setup
app.use(
  cors({
    origin: "http://localhost:5173",   
    credentials: true,                 
  })
);


const userRoutes = require("../routes/userRoute");
const bookRoutes = require("../routes/bookRoute");
const authRoutes = require("../routes/authRoute");
const roomRoutes = require("../routes/roomRoute");
const serviceRoutes = require("../routes/serviceRoute");
const bookServiceRoutes = require("../routes/bookServiceRoute");
const invoiceRoutes = require("../routes/invoiceRoute");
const feedbackRoutes = require("../routes/feedbackRoute");
const countRoutes = require("../routes/adminCountRoute");
const userCountRoutes = require("../routes/userCountRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookRoutes);
app.use("/api/bookservice", bookServiceRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/count", countRoutes);
app.use("/api/user/count", userCountRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(400).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
