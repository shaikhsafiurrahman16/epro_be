const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
    ],

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    dates: {
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
    },

    booking_status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
