const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    phone: { type: String, required: true },
    booking_type: { type: String, enum: ["Online", "WalkIn"], required: true },
    booking_status: {
      type: String,
      enum: ["Pending", "Checked_In", "Checked_Out", "cancelled"],
      default: "Pending",
    },
    invoice_status: {
      type: String,
      enum: ["Not_Created", "Created", "Paid"],
      default: "Not_Created",
    },
    datetime_check_in: { type: Date, required: true },
    datetime_check_out: { type: Date, required: true },
    guests: [
      {
        guest_type: {
          type: String,
          enum: ["Adult", "Kid", "Infant"],
          required: true,
        },
        guest_number: { type: Number, required: true, min: 1 },
      },
    ],
    rooms: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
