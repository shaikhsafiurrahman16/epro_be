const express = require("express");
const router = express.Router();
const { addFeedback, getFeedbacks } = require("../controllers/feedbackController");
const { addFeedbackValidator } = require("../validations/feedbackValidator");
const validateSingleError = require("../middlewares/validationMiddleware"); // same as your previous validations

// Add Feedback
router.post("/create", addFeedbackValidator, validateSingleError, addFeedback);

// Get All Feedbacks
router.get("/read", getFeedbacks);

module.exports = router;
