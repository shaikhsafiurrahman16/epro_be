const express = require("express");
const router = express.Router();
const {roomValidator} = require("../validations/roomValidator.js")
const {
  addRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  changeRoomStatus,
} = require("../controllers/roomController");
const validateSingleError = require("../middlewares/validationMiddleware.js")

router.post("/create", roomValidator, validateSingleError, addRoom);
router.put("/update/:id", roomValidator, validateSingleError, updateRoom);
router.delete("/delete/:id", deleteRoom);

router.get("/read", getRooms);
router.get("/get-by-id/:id",  getRoomById);
router.patch("/change-status/:id", changeRoomStatus);

module.exports = router;
