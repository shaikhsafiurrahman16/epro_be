const express = require("express");
const router = express.Router();

const {
  createBooking,
  updateBookingStatus,
  getAllBookings,
  getBookingById,
  updateBooking,
} = require("../controllers/bookController");

const {
    forCreate,
    forUpdate
} = require("../validations/bookValidator");
const validateSingleError = require("../middlewares/validationMiddleware");

router.post("/create", forCreate, validateSingleError, createBooking);
router.get("/read", getAllBookings);
router.get("/get-by-id/:id", getBookingById);
router.patch("/update/:id", forUpdate, validateSingleError, updateBooking);
router.put("/change-status/:id", updateBookingStatus);



module.exports = router;
