const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, permission } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "customer",
      permission: permission || ["Read"],
    });

    res.status(200).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

    // const users = await User.find().select("-password");


// Get User By Id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, permission, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;
    user.permission = permission || user.permission;

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "User updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change User Status
const changeUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "Active" ? "Inactive" : "Active";
    await user.save();

    res.json({ message: `User status Updated` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  changeUserStatus,
  deleteUser,
};