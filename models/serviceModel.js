const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service_name: { type: String, required: true },
    service_price: { type: Number, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
