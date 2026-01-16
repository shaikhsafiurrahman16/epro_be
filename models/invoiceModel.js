const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    room_charges: [
      {
        _id: false, 
        room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
        number: { type: Number, ref: "Room", required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true },
      },
    ],
    service_charges: [
      {
        _id: false, 
        service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        price: { type: Number,  required: true  },
        quantity: { type: String,  required: true  },
        name: { type: String,  required: true  },
      },
    ],
    total_amount: { type: Number, required: true },
    payment_method: { 
      type: String, 
      enum: ["Cash", "Credit Card", "Debit Card", "Online"], 
      default: "Cash" 
    },
    payment_status: { 
      type: String, 
      enum: ["Paid", "Pending", "Failed"], 
      default: "Pending" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
