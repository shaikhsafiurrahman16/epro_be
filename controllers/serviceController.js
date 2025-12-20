const Service = require("../models/serviceModel");

// Add Service
const addService = async (req, res) => {
  try {
    const { service_name, service_price, description} = req.body;
    const service = await Service.create({ service_name, service_price, description});
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Service
const updateService = async (req, res) => {
  try {
    const { service_name, service_price, description } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.service_name = service_name || service.service_name;
    service.service_price = service_price || service.service_price;
    service.description = description || service.description;

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle Service Status
const changeServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.status = service.status === "Active" ? "Inactive" : "Active";
    await service.save();

    res.json({ message: `Service status updated to ${service.status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    await service.deleteOne();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addService,
  getServices,
  getServiceById,
  updateService,
  changeServiceStatus,
  deleteService,
};
