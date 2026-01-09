const Booking = require("../models/bookModel");
const Room = require("../models/roomModel");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      user_id,
      phone,
      booking_type,
      guests,
      rooms,
      datetime_check_in,
      datetime_check_out,
    } = req.body;

    if (!phone || !booking_type || !rooms || rooms.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Required fields missing" });
    }

    if (!datetime_check_in || !datetime_check_out) {
      return res.status(400).json({
        status: false,
        message: "Check-in and check-out dates required",
      });
    }

    if (
      !guests ||
      guests.length === 0 ||
      guests.some((g) => g.guest_number < 1)
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Guests must be at least 1" });
    }
    const roomDocs = await Room.find({ _id: { $in: rooms } });
    if (roomDocs.length !== rooms.length) {
      return res
        .status(404)
        .json({ status: false, message: "One or more rooms not found" });
    }

    const alreadyBooked = roomDocs.find((r) => r.room_status === "Booked");
    if (alreadyBooked) {
      return res.status(400).json({
        status: false,
        message: `Room ${alreadyBooked.room_number} is already booked`,
      });
    }

    // Create booking
    const booking = await Booking.create({
      user_id,
      phone,
      booking_type,
      guests,
      rooms,
      datetime_check_in,
      datetime_check_out,
      booking_status: "Checked_In",
    });

    // Mark rooms as booked
    await Room.updateMany(
      { _id: { $in: rooms } },
      { $set: { room_status: "Booked" } }
    );

    res
      .status(201)
      .json({ status: true, message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ status: false, message: "Booking not found" });

    booking.booking_status = status;
    await booking.save();

    if (status === "Cancelled") {
      await Room.updateMany(
        { _id: { $in: booking.rooms } },
        { $set: { room_status: "Available" } }
      );
    }

    res.json({ status: true, message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id", "name email phone")
      .populate("rooms", "room_number room_type room_price room_status");
    res.json({
      status: true,
      message: "All bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Get booking by id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user_id", "name email phone")
      .populate("rooms", "room_number room_type room_price room_status");

    if (!booking)
      return res
        .status(404)
        .json({ status: false, message: "Booking not found" });
    res.json({
      status: true,
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const { guests, rooms, datetime_check_in, datetime_check_out } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ status: false, message: "Booking not found" });

    if (guests && guests.some((g) => g.guest_number < 1)) {
      return res
        .status(400)
        .json({ status: false, message: "Guests must be at least 1" });
    }

    if (guests) booking.guests = guests;
    if (datetime_check_in) booking.datetime_check_in = datetime_check_in;
    if (datetime_check_out) booking.datetime_check_out = datetime_check_out;

    if (rooms && rooms.length > 0) {
      const roomDocs = await Room.find({ _id: { $in: rooms } });
      if (roomDocs.length !== rooms.length)
        return res
          .status(404)
          .json({ status: false, message: "One or more rooms not found" });

      const alreadyBooked = roomDocs.find(
        (r) => r.room_status === "Booked" && !booking.rooms.includes(r._id)
      );
      if (alreadyBooked)
        return res.status(400).json({
          status: false,
          message: `Room ${alreadyBooked.room_number} is already booked`,
        });

      await Room.updateMany(
        { _id: { $in: booking.rooms } },
        { $set: { room_status: "Available" } }
      );

      booking.rooms = rooms;
      await Room.updateMany(
        { _id: { $in: rooms } },
        { $set: { room_status: "Booked" } }
      );
    }

    await booking.save();

    const updatedBooking = await Booking.findById(req.params.id)
      .populate("user_id", "name email phone")
      .populate("rooms", "room_number room_type room_price room_status");

    res.json({
      status: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getAllBookings,
  getBookingById,
  updateBooking,
};
