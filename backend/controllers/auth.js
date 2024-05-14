const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Role = require('../models/roles');

//Post req
const register = async (req, res) => {

  try {
    const {
      body: { email, password },
    } = req;
    const found = await User.findOne({ email });
    if (found) throw new Error("User already Exists");

    const hash = await bcrypt.hash(password, 10);

    //get admin role
    const role = await Role.findOne({ name: "Admin" });
    console.log(role);
    const user = await User.create({
      email,
      password: hash,
      role: role._id,
    });
    res.json({ email: user.email, id: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
};


	

const login = async (req, res) => {
	try {
		const {
			body: { email, password },
		} = req;
		const user = await User.findOne({ email })
			.select('+password')
			.populate({
				path: 'role',
				populate: {
					path: 'permissions',
					model: 'Permission',
					select: 'name',
				},
			});


		if (!user) throw new Error("User doesn't Exists");
		console.log(user);

		const match = await bcrypt.compare(password, user.password);

		if (!match) throw new Error('Incorrect Password');
		//put profile pic here (inside the cookie)
		// add multiple roles and
		const payload = {
			id: user._id,
			email: user.email,
			role: user.role,
			_id: user._id,
			profilePicture: user.profilePicture,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '480m',
		});
		res
			.cookie('access_token', token, { httpOnly: true, maxAge: 28800000 })
			.json(payload);
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const logout = async (req, res) => {
	try {
		res
			.cookie('access_token', '', { httpOnly: true, maxAge: 0 })
			.json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}
};
const getProfile = async (req, res) => {

	try {
		const {
			user: { id },
		} = req;
		const user = await User.findById(id)
			.populate('role')
			.populate({
				path: 'role',
				populate: {
					path: 'permissions',
					model: 'Permission',
					select: 'name',
				},
			});
		res.json(user);
		// const {body:{name,email,password,roles}}=req;
		// const found = await User.findOne({email})
		// if(!user) throw new Error("User doesn't Exists")
		// console.log(user)
	} catch (error) {
		console.log(error);
		res.status(500).json('Something went wrong');
	}

};
module.exports = { register, login, logout, getProfile };
