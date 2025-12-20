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

router.post("/create", serviceValidator, validateSingleError, addService);
router.get("/read", getServices);
router.get("/get-by-id/:id", getServiceById);
router.put("/update/:id", serviceValidator, validateSingleError, updateService);
router.patch("/change-status/:id", changeServiceStatus);
router.delete("/delete/:id", deleteService);

module.exports = router;
