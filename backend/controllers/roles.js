const Project = require('../models/projects');
const Role = require('../models/roles');

const createRole = async (req, res) => {
	try {
		const { name, permissions } = req.body;

		const role = await Role.create({
			name,
			permissions,
			project: req.user.project,
		});

		const project = await Project.findOne({ owner: req.user.id });
		project.roles.push(role._id);
		await project.save();
		// console.log(project);
		res.status(201).json(role);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Controller function to get all roles
const getAllRoles = async (req, res) => {
	try {
		const query = {};
		if (req.query.project) {
			query.project;
		}
		const roles = await Role.find().populate({
			path: 'permissions',
			model: 'Permission',
			select: 'name',
		});
		res.status(200).json(roles);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Controller function to get a role by its ID
const getRoleById = async (req, res) => {
	try {
		const role = await Role.findById(req.params.id).populate({
			path: 'permissions',
			model: 'Permission',
		});
		if (!role) {
			return res.status(404);
		}
		res.status(200).json(role);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Controller function to update a role
const updateRole = async (req, res) => {
	try {
		const { name, permissions } = req.body;
		const role = await Role.findByIdAndUpdate(
			req.params.id,
			{ name, permissions },
			{ new: true }
		);
		if (!role) {
			return res.status(404);
		}
		res.status(200).json({ message: 'Role updated successfully', role });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Controller function to delete a role
const deleteRole = async (req, res) => {
	try {
		const role = await Role.findByIdAndDelete(req.params.id);
		if (!role) {
			return res.status(404).json({ message: 'Role not found' });
		}

		// Remove the role from the project's roles array
		const project = await Project.findOne({ owner: req.user.id });
		project.roles.pull(role._id);
		await project.save();

		res.status(200).json({ message: 'Role deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getAllRoles,
	getRoleById,
	createRole,
	updateRole,
	deleteRole,
};
