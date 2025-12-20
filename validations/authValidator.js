const { body } = require("express-validator");

exports.signupValidator = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

  body("phone")
    .notEmpty().withMessage("Phone is required")
    .matches(/^\d{10,15}$/).withMessage("Phone must be 10-15 digits"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least 1 uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least 1 lowercase letter")
    .matches(/\d/).withMessage("Password must contain at least 1 number")
    .matches(/[\W_]/).withMessage("Password must contain at least 1 special character"),
];


exports.loginValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];