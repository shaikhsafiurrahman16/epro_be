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
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  createUserValidation,
  validateSingleError,
  createUser,
);
router.get("/read", authMiddleware, getAllUsers);
router.put(
  "/update/:id",
  authMiddleware,
  createUserValidation,
  validateSingleError,
  updateUser,
);
router.post("/change-status/:id", authMiddleware, changeUserStatus);
router.get("/get-by-id/:id", authMiddleware, getUserById);
router.delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
