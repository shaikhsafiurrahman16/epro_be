const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room_number: { type: Number, required: true },
    room_type: { type: String, enum: ["Single Bed" , "Double Bed"] },
    room_price: { type: Number, required: true },
    room_status: {
      type: String,
      enum: ["Available", "Booked"],
      default: "Available",
    },
    isBooked: { type: Boolean, default: false }
  },
);

module.exports = mongoose.model("Room", roomSchema);
