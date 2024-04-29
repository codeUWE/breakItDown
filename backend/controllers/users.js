const User = require('../models/users');

const getUsers = async (req, res) => {
	try {
		// const { isActive } = req.query;
		const query = {};

		// if (isActive === 'true') query.isActive = true;
		// if (isActive === 'false') query.isActive = false;

		const users = await User.find(query);
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
			  model: 'Permission'
			} 
		 });

		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};

const createUser = async (req, res) => {
	try {
		const {  name, age, email,password,profilePicture,socialConnections,availability,roles } = req.body;
		const createdUser = await User.create({
			name,
			age,
            email,
			password,
            profilePicture,
            socialConnections,
            availability,
            roles,
          
	
		});
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
		const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
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