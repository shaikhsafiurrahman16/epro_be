const { body } = require("express-validator");

const forCreate = [
  body("user_id").notEmpty().withMessage("User is required"),
  body("rooms").isArray({ min: 1 }).withMessage("At least one room required"),
  body("datetime_check_in").notEmpty().withMessage("Check-in date required"),
  body("datetime_check_out").notEmpty().withMessage("Check-out date required"),
];

const forUpdate = [
  body("rooms").isArray({ min: 1 }).withMessage("At least one room required"),
  body("guests").isInt({ min: 1 }).withMessage("Guests must be at least 1"),
  body("dates.checkIn").notEmpty().withMessage("Check-in date required"),
  body("dates.checkOut").notEmpty().withMessage("Check-out date required"),
];

module.exports = {
    forCreate, forUpdate
}