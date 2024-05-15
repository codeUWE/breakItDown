const User = require('../models/users');
const bcrypt = require('bcrypt');
const Project = require('../models/projects');

const getUsers = async (req, res) => {
	try {
		// const { isActive } = req.query;
		const query = {};
		if (req.query.project) {
			query.project = req.user.project;
		}

		// if (isActive === 'true') query.isActive = true;
		// if (isActive === 'false') query.isActive = false;

		const users = await User.find(query).populate({
			path: 'role',
			populate: {
				path: 'permissions',
				model: 'Permission',
				select: 'name',
			},
		});
		// //without using query - showing only the ones which are active
		// // const users = await User.find({ isActive: true });
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id).populate({
			path: 'roles',
			populate: {
				path: 'permissions',
				model: 'Permission',
				select: 'name',
			},
		});

		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};

const createUser = async (req, res) => {
	// console.log(`Inside create User ${req.body}`);
	try {
		const {
			name,
			age,
			email,
			password,
			profilePicture,
			socialConnections,
			availability,
			role,
			project,
		} = req.body;
		const found = await User.findOne({ email });
		if (found) throw new Error('User already Exists');
		const hash = await bcrypt.hash(password, 10);
		let createdUser = await User.create({
			name,
			age,
			email,
			password: hash,
			profilePicture,
			socialConnections,
			availability,
			role,
			project,
		});
		createdUser = await createdUser.populate('role');
		const foundProject = await Project.findById(project);
		foundProject.users.push(createdUser._id);
		await foundProject.save();
		res.json(createdUser);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const updateUser = async (req, res) => {
	try {
		const {
			body,
			params: { id },
		} = req;
		console.log(id, body, req.file);
		const data = { ...body };
		if (req.file) {
			data.profilePicture = req.file.path;
		}

		const updatedUser = await User.findByIdAndUpdate(id, data, {
			new: true,
		}).populate({
			path: 'role',
			populate: {
				path: 'permissions',
				model: 'Permission',
				select: 'name',
			},
		});
		res.send(updatedUser);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);
		res.send(deletedUser);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
