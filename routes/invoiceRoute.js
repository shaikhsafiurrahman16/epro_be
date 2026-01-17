const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updatePaymentStatus,
  markInvoicePaid,
} = require("../controllers/invoiceController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware ,createInvoice);
router.get("/read", authMiddleware ,getInvoices);
router.post("/markPaid/:id", authMiddleware ,markInvoicePaid);
router.get("/get-by-id/:id", authMiddleware ,getInvoiceById);
router.patch("/update/:id/payment", authMiddleware ,updatePaymentStatus);

module.exports = router;
