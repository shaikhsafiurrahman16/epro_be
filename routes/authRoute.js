const express = require("express");
const router = express.Router();

const { Signup, Login } = require("../controllers/authController");
const { signupValidator, loginValidator } = require("../validations/authValidator.js")
const validateSingleError = require("../middlewares/validationMiddleware.js")

router.post("/signup", signupValidator, validateSingleError, Signup);
router.post("/login", loginValidator, validateSingleError, Login);

module.exports = router;