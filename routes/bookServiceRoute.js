const express = require("express");
const router = express.Router();

const {
  addBookingServices,
} = require("../controllers/bookServiceController");

const bookingServiceValidation = require("../validations/bookServiceVlaidator");
const validateSingleError = require("../middlewares/validationMiddleware");

router.post(
  "/create",
  bookingServiceValidation,
  validateSingleError,
  addBookingServices
);

module.exports = router;