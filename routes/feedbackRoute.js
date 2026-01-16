const express = require("express");
const router = express.Router();
const { addFeedback, getFeedbacks } = require("../controllers/feedbackController");
const { addFeedbackValidator } = require("../validations/feedbackValidator");
const validateSingleError = require("../middlewares/validationMiddleware"); 

router.post("/create", addFeedbackValidator, validateSingleError, addFeedback);
router.get("/read", getFeedbacks);

module.exports = router;
