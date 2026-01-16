const { body } = require("express-validator");

const bookingServiceValidation = [
  body("booking_id")
    .notEmpty()
    .withMessage("Booking ID is required"),

  body("room_id")
    .notEmpty()
    .withMessage("Room ID is required"),

  body("services")
    .isArray({ min: 1 })
    .withMessage("At least one service is required"),
];

module.exports = bookingServiceValidation;
