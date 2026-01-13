const express = require("express");
const router = express.Router();

const {
  getTotalBookings,
  getRoomCounts,
  getServiceCounts,
  getAllUsers,
} = require("../controllers/adminCountController");

router.get("/bookings", getTotalBookings);
router.get("/rooms", getRoomCounts);
router.get("/services", getServiceCounts);
router.get("/users", getAllUsers);

module.exports = router;
