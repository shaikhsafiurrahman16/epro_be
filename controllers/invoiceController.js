const Invoice = require("../models/invoiceModel");

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const {
      booking_id,
      room_charges,
      service_charges,
      payment_method,
      payment_status,
    } = req.body;

    if (!booking_id || !room_charges || room_charges.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Booking ID and room charges are required",
      });
    }

    const totalRoom = room_charges.reduce((sum, r) => sum + Number(r.price), 0);
    const totalService =
      service_charges && service_charges.length > 0
        ? service_charges.reduce((sum, s) => sum + Number(s.price), 0)
        : 0;

    const invoice = await Invoice.create({
      booking_id,
      room_charges,
      service_charges:
        service_charges && service_charges.length > 0 ? service_charges : null,
      total_amount: totalRoom + totalService,
      payment_method: payment_method || "Cash",
      payment_status: payment_status || "Pending",
    });

    res
      .status(201)
      .json({ status: true, message: "Invoice created successfully", invoice });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("booking_id", "booking_status rooms")
      .populate("room_charges.room_id", "room_number room_type")
      .populate("service_charges.service_id", "service_name service_price");

    res.json({ status: true, invoices });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("booking_id", "booking_status rooms")
      .populate("room_charges.room_id", "room_number room_type")
      .populate("service_charges.service_id", "service_name service_price");

    if (!invoice)
      return res
        .status(404)
        .json({ status: false, message: "Invoice not found" });

    res.json({ status: true, invoice });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {
  try {
    const { payment_status } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice)
      return res
        .status(404)
        .json({ status: false, message: "Invoice not found" });

    invoice.payment_status = payment_status;
    await invoice.save();

    res.json({ status: true, message: "Payment status updated", invoice });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Invoice Paid
const markInvoicePaid = async (req, res) => {
  try {
    const { payment_method } = req.body;
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.payment_status = "Paid";
    invoice.payment_method = payment_method;
    await invoice.save();

    res.json({ message: "Invoice marked as Paid", invoice });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updatePaymentStatus,
  markInvoicePaid,
};
