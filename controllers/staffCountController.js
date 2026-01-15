const Booking = require("../models/bookModel");
const Room = require("../models/roomModel");
const Service = require("../models/serviceModel");

// Get all booking
const getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    res.status(200).json({
      status: true,
      message: "Total bookings fetched successfully",
      totalBookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all Rooms
const getRoomCounts = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({
      room_status: "Available",
    });
    const bookedRooms = await Room.countDocuments({ room_status: "Booked" });

    res.status(200).json({
      status: true,
      message: "Room counts fetched successfully",
      data: {
        totalRooms,
        availableRooms,
        bookedRooms,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all Services
const getServiceCounts = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();

    res.status(200).json({
      status: true,
      message: "Service counts fetched successfully",
      data: {
        totalServices,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


module.exports = {
  getTotalBookings,
  getRoomCounts,
  getServiceCounts,
};
