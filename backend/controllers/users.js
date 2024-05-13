const User = require('../models/users');
const bcrypt = require('bcrypt');
const { request } = require('express');

const getUsers = async (req, res) => {
	try {
		// const { isActive } = req.query;
		const query = {};

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
		} = req.body;
		const found = await User.findOne({ email });
		if (found) throw new Error('User already Exists');
		const hash = await bcrypt.hash(password, 10);
		const createdUser = await User.create({
			name,
			age,
			email,
			password: hash,
			profilePicture,
			socialConnections,
			availability,
			role,
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
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ ...body, profilePicture: request.file.path },
			{ new: true }
		);
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

// async function constructImageUrl(userId) {
// 	// Construct the image URL based on the user's ID
// 	return `https://randomuser.me/api/portraits/men/${userId}.jpg`;
//   }

//   async function updateUserImageUrls() {
// 	try {
// 	  // Fetch all users from the database
// 	  const users = await User.find();

// 	  // Iterate over each user
// 	  for (const user of users) {
// 		// Construct the image URL
// 		const imageUrl = await constructImageUrl(user.id);

// 		// Update the user document with the image URL
// 		await User.findByIdAndUpdate(user._id, { image_url: imageUrl });
// 	  }

// 	  console.log('Image URLs updated successfully.');
// 	} catch (error) {
// 	  console.error('Error updating image URLs:', error);
// 	}
//   }

//   // Call the function to update image URLs
//   updateUserImageUrls();
