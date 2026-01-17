const express = require("express");
const router = express.Router();

const { Signup, Login } = require("../controllers/authController");
const {
  signupValidator,
  loginValidator,
} = require("../validations/authValidator.js");
const validateSingleError = require("../middlewares/validationMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/signup",
//   authMiddleware,
  signupValidator,
  validateSingleError,
  Signup,
);
router.post(
  "/login",
//   authMiddleware,
  loginValidator,
  validateSingleError,
  Login,
);

module.exports = router;
