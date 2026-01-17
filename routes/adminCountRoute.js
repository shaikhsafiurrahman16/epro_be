const express = require("express");
const router = express.Router();

const {
  getTotalBookings,
  getRoomCounts,
  getServiceCounts,
  getAllUsers,
} = require("../controllers/adminCountController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/bookings", authMiddleware ,getTotalBookings);
router.get("/rooms", authMiddleware ,getRoomCounts);
router.get("/services", authMiddleware ,getServiceCounts);
router.get("/users", authMiddleware ,getAllUsers);

module.exports = router;
