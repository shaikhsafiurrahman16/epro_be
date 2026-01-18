const express = require("express");
const router = express.Router();

const {
  getMyBookings,
  getUpcomingBookings,
  getUpcomingBookingsList,
} = require("../controllers/userCountController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/mybooking", authMiddleware, getMyBookings);
router.get("/upcomingbooking", authMiddleware, getUpcomingBookings);
router.get("/upcominglist", authMiddleware, getUpcomingBookingsList);

module.exports = router;
