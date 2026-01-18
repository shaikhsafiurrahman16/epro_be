const express = require("express");
const router = express.Router();
const {
  addFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");
const { addFeedbackValidator } = require("../validations/feedbackValidator");
const validateSingleError = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  addFeedbackValidator,
  validateSingleError,
  addFeedback,
);
router.get("/read", authMiddleware, getFeedbacks);

module.exports = router;
