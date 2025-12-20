const Booking = require("../models/bookModel");
const Room = require("../models/roomModel");


// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { user_id, rooms, guests, dates } = req.body;

    if (!user_id || !rooms || rooms.length === 0) {
      return res.status(400).json({ message: "User and rooms are required" });
    }

    const roomDocs = await Room.find({ _id: { $in: rooms } });

    if (roomDocs.length !== rooms.length) {
      return res.status(404).json({ message: "One or more rooms not found" });
    }

    const alreadyBooked = roomDocs.find(
      (room) => room.status === "booked"
    );

    if (alreadyBooked) {
      return res.status(400).json({
        message: `Room ${alreadyBooked.room_number} is already booked`,
      });
    }

    const booking = await Booking.create({
      user_id,
      rooms,
      guests,
      dates,
      booking_status: "confirmed",
    });

    await Room.updateMany(
      { _id: { $in: rooms } },
      { $set: { status: "booked" } }
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BOOKING STATUS
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.booking_status = status;
    await booking.save();

    // If cancelled → free rooms
    if (status === "cancelled") {
      await Room.updateMany(
        { _id: { $in: booking.rooms } },
        { $set: { status: "available" } }
      );
    }

    res.json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id", "name email phone") // User ka basic info
      .populate("rooms", "room_number room_type price status"); // Rooms info

    res.json({
      message: "All bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ SINGLE BOOKING
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user_id", "name email phone")
      .populate("rooms", "room_number room_type price status");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BOOKING
const updateBooking = async (req, res) => {
  try {
    const { guests, dates, rooms } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ Update guests & dates
    if (guests) booking.guests = guests;
    if (dates) booking.dates = dates;

    // 🔹 If rooms updated, check availability & auto-book
    if (rooms && rooms.length > 0) {
      const roomDocs = await Room.find({ _id: { $in: rooms } });

      if (roomDocs.length !== rooms.length) {
        return res.status(404).json({ message: "One or more rooms not found" });
      }

      const alreadyBooked = roomDocs.find(
        (room) => room.status === "booked" && !booking.rooms.includes(room._id)
      );

      if (alreadyBooked) {
        return res.status(400).json({
          message: `Room ${alreadyBooked.room_number} is already booked`,
        });
      }

      // 🔹 Free old rooms
      await Room.updateMany(
        { _id: { $in: booking.rooms } },
        { $set: { status: "available" } }
      );

      // 🔹 Assign new rooms & mark booked
      booking.rooms = rooms;
      await Room.updateMany(
        { _id: { $in: rooms } },
        { $set: { status: "booked" } }
      );
    }

    await booking.save();

    const updatedBooking = await Booking.findById(req.params.id)
      .populate("user_id", "name email phone")
      .populate("rooms", "room_number room_type price status");

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createBooking,
    updateBookingStatus,
    getAllBookings,
    getBookingById,
    updateBooking,
}
