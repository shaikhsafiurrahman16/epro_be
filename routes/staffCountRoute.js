const express = require("express");
const router = express.Router();

const {
  getTotalBookings,
  getRoomCounts,
  getServiceCounts,
} = require("../controllers/adminCountController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/bookings", authMiddleware, getTotalBookings);
router.get("/rooms", authMiddleware, getRoomCounts);
router.get("/services", authMiddleware, getServiceCounts);

module.exports = router;
