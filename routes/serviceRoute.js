const express = require("express");
const router = express.Router();

const {
  addService,
  getServices,
  getServiceById,
  updateService,
  changeServiceStatus,
  deleteService,
} = require("../controllers/serviceController.js");

const { serviceValidator } = require("../validations/serviceValidator.js");
const validateSingleError = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  serviceValidator,
  validateSingleError,
  addService,
);
router.get("/read", authMiddleware, getServices);
router.get("/get-by-id/:id", authMiddleware, getServiceById);
router.put("/update/:id", serviceValidator, validateSingleError, updateService);
router.patch("/change-status/:id", authMiddleware, changeServiceStatus);
router.delete("/delete/:id", authMiddleware, deleteService);

module.exports = router;
