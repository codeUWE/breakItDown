const Permission = require('../models/permissions');

// Controller function to create a new permission
const createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const newPermission = new Permission({ name });
    const savedPermission = await newPermission.save();
    res.status(201).json(savedPermission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get all permissions
const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a single permission by ID
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404);
    }
    res.json(permission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to update a permission by ID
const updatePermission = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedPermission) {
      return res.status(404);
    }
    res.json(updatedPermission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to delete a permission by ID
const deletePermission = async (req, res) => {
  try {
   
    const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
    if (!deletedPermission) {
      return res.status(404);
    }
    res.json({ message: 'Permission deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {getAllPermissions,getPermissionById,createPermission,updatePermission,deletePermission}



