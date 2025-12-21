const Feedback = require("../models/feedbackModel");

// Add Feedback
const addFeedback = async (req, res) => {
    try {
        const { user_id, booking_id, rating, remarks } = req.body;

        const feedback = await Feedback.create({
            user_id,
            booking_id,
            rating,
            remarks
        });

        res.status(201).json({
            status: true,
            message: "Feedback added successfully",
            feedback
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get All Feedbacks
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate("user_id", "name email")  // optional, if you want user info
            .populate("booking_id", "checkIn checkOut"); // optional, booking info

        res.status(200).json({
            status: true,
            feedbacks
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { addFeedback, getFeedbacks };
