const BookingService = require("../models/bookServiceModel");
const Service = require("../models/serviceModel");

// Book Service
const addBookingServices = async (req, res) => {
  try {
    const { booking_id, room_id, services } = req.body;

    let servicesWithPrice = [];
    let services_total = 0;

    for (let item of services) {
      const service = await Service.findById(item.service_id);

      if (!service || service.status !== "Active") {
        return res.status(400).json({
          status: false,
          message: "Invalid or inactive service",
        });
      }

      const line_total = service.service_price * item.quantity;
      services_total += line_total;

      servicesWithPrice.push({
        service_id: service._id,
        service_price: service.service_price,
        quantity: item.quantity,
        line_total,
      });
    }

    const bookingService = await BookingService.create({
      booking_id,
      room_id,
      services: servicesWithPrice,
      services_total,
    });

    res.status(201).json({
      status: true,
      message: "Booking services added successfully",
      data: bookingService,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBookingServices,
};
