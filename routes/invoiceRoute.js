const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updatePaymentStatus,
  markInvoicePaid,
} = require("../controllers/invoiceController");

router.post("/create", createInvoice);
router.get("/read", getInvoices);
router.post("/markPaid/:id", markInvoicePaid);
router.get("/get-by-id/:id", getInvoiceById);
router.patch("/update/:id/payment", updatePaymentStatus);

module.exports = router;
