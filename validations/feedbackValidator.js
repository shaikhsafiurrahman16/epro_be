const { body } = require("express-validator");

const addFeedbackValidator = [
    body("user_id").notEmpty().withMessage("User ID is required"),
    body("booking_id").notEmpty().withMessage("Booking ID is required"),
    body("rating")
        .notEmpty().withMessage("Rating is required")
        .isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("remarks").optional().isString().withMessage("Remarks must be a string")
];

module.exports = { addFeedbackValidator };
