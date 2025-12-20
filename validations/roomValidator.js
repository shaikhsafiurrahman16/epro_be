const { body } = require("express-validator");

exports.roomValidator = [
  body("room_number")
    .notEmpty().withMessage("Room number is required"),

  body("room_type")
    .notEmpty().withMessage("Room type is required")
    .isIn(["Single Bed", "Double Bed"]).withMessage("Invalid room type"),

  body("room_price")
    .notEmpty().withMessage("Room price is required")
    .isNumeric().withMessage("Room price must be a number"),
];