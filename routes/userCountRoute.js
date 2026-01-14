const express = require("express");
const router = express.Router();

const {
  getMyBookings,
    getUpcomingBookings,
    getUpcomingBookingsList,
} = require("../controllers/userCountController");

router.get("/mybooking", getMyBookings);
router.get("/upcomingbooking", getUpcomingBookings);
router.get("/upcominglist", getUpcomingBookingsList);

module.exports = router;
