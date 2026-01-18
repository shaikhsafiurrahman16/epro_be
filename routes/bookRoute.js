const express = require("express");
const router = express.Router();

const {
  createBooking,
  updateBookingStatus,
  getAllBookings,
  getBookingById,
  updateBooking,
  checkoutBooking,
} = require("../controllers/bookController");

const { forCreate, forUpdate } = require("../validations/bookValidator");
const validateSingleError = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  forCreate,
  validateSingleError,
  createBooking,
);
router.get("/read", authMiddleware, getAllBookings);
router.get("/get-by-id/:id", authMiddleware, getBookingById);
router.patch(
  "/update/:id",
  authMiddleware,
  forUpdate,
  validateSingleError,
  updateBooking,
);
router.put("/change-status/:id", authMiddleware, updateBookingStatus);
router.post("/checkout/:id", authMiddleware, checkoutBooking);

module.exports = router;
