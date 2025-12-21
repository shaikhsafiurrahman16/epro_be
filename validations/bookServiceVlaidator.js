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

//   body("services.*.service_id")
//     .notEmpty()
//     .withMessage("Service ID is required"),

//   body("services.*.quantity")
//     .isInt({ min: 1 })
//     .withMessage("Quantity must be at least 1"),
];

module.exports = bookingServiceValidation;
