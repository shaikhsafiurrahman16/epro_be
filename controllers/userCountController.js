const Booking = require("../models/bookModel");

// Get Logged in user Bokings
const getMyBookings = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "userId is required",
      });
    }

    const myBookings = await Booking.countDocuments({ user_id: userId });

    res.status(200).json({
      status: true,
      message: "My bookings fetched",
      myBookings,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get Logged in user Upcoming bookings
const getUpcomingBookings = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "userId is required",
      });
    }

    const upcomingBookings = await Booking.countDocuments({
      user_id: userId,
      datetime_check_in: { $gt: new Date() },
    });

    res.status(200).json({
      status: true,
      message: "Upcoming bookings fetched successfully",
      upcomingBookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get Logged in user Upcoming booking list
const getUpcomingBookingsList = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "userId is required",
      });
    }

    const bookings = await Booking.find({
      user_id: userId,
    });

    res.status(200).json({
      status: true,
      message: "Upcoming bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyBookings,
  getUpcomingBookings,
  getUpcomingBookingsList,
};
