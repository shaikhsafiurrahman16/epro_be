const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: [true, "Booking ID is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5
    },
    remarks: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
