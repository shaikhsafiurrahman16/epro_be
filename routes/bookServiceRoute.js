const express = require("express");
const router = express.Router();

const { addBookingServices } = require("../controllers/bookServiceController");

const bookingServiceValidation = require("../validations/bookServiceVlaidator");
const validateSingleError = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  bookingServiceValidation,
  validateSingleError,
  addBookingServices,
);

module.exports = router;
