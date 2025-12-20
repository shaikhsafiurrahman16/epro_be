const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  changeUserStatus,
  deleteUser,
} = require("../controllers/userController.js");
const { createUserValidation } = require("../validations/userValidator.js");
const validateSingleError = require("../middlewares/validationMiddleware.js");
const router = express.Router();

router.post("/create", createUserValidation, validateSingleError, createUser);
router.get("/read", getAllUsers);
router.put(
  "/update/:id",
  createUserValidation,
  validateSingleError,
  updateUser
);
router.post("/change-status/:id", changeUserStatus);
router.get("/get-by-id/:id", getUserById);
router.delete("/delete/:id", deleteUser);

module.exports = router;
