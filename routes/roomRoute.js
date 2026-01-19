const express = require("express");
const router = express.Router();
const { roomValidator } = require("../validations/roomValidator.js");
const {
  addRoom,
  getRooms,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  changeRoomStatus,
  getAvailableRoomsByType,
} = require("../controllers/roomController");
const validateSingleError = require("../middlewares/validationMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  roomValidator,
  validateSingleError,
  addRoom,
);
router.put(
  "/update/:id",
  authMiddleware,
  roomValidator,
  validateSingleError,
  updateRoom,
);
router.delete("/delete/:id", authMiddleware, deleteRoom);

router.get("/read", getRooms);
router.get("/readall", authMiddleware, getAllRooms);
router.get("/get-by-id/:id", authMiddleware, getRoomById);
router.patch("/change-status/:id", authMiddleware, changeRoomStatus);
router.get("/available/by-type", authMiddleware, getAvailableRoomsByType);

module.exports = router;
