const Room = require("../models/roomModel");

// Add Room
const addRoom = async (req, res) => {
  try {
    const { room_number, room_type, room_price } = req.body;
    const room = await Room.create({ room_number, room_type, room_price });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Room
const updateRoom = async (req, res) => {
  try {
    const { room_number, room_type, room_price } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(400).json({ message: "Room not found" });

    room.room_number = room_number || room.room_number;
    room.room_type = room_type || room.room_type;
    room.room_price = room_price || room.room_price;

    await room.save();
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Room Status
const changeRoomStatus = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(400).json({ message: "Room not found" });

    room.room_status = room.room_status === "Available" ? "Booked" : "Available";
    await room.save();

    res.json({ message: `Room status update` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addRoom,
    getRooms,
    getRoomById,
    updateRoom,
    changeRoomStatus,
} 