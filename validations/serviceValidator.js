const { body } = require("express-validator");

exports.serviceValidator = [
  body("service_name")
    .notEmpty()
    .withMessage("Service name is required"),
  
  body("service_price")
    .notEmpty()
    .withMessage("Service price is required")
    .isNumeric()
    .withMessage("Service price must be a number"),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be Active or Inactive"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];