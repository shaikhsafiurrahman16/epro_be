const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updatePaymentStatus,
} = require("../controllers/invoiceController");

router.post("/create", createInvoice);
router.get("/read", getInvoices);
router.get("/get-by-id/:id", getInvoiceById);
router.patch("/update/:id/payment", updatePaymentStatus);

module.exports = router;
