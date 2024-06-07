const Project = require('../models/projects');
const User = require('../models/users');

const updateProject = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, users = [], roles = [] } = req.body;

		const updatedProject = await Project.findByIdAndUpdate(
			id,
			{
				title,
				users,
				roles,
			},
			{ new: true }
		);

		if (!updatedProject) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.json(updatedProject);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const createProject = async (req, res, next) => {
	try {
		const { title, users = [], roles = [] } = req.body;

		const createdProject = await Project.create({
			title,
			users,
			roles,
			owner: req.user.id,
		});
		await User.findByIdAndUpdate(req.user.id, { project: createdProject._id });

		res.json(createdProject);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const getProjects = async (req, res) => {
	try {
		const projects = await Project.find({});
		res.json(projects);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteProject = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProject = await Task.findByIdAndDelete(id);
		res.send(deletedProject);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const getProjectByUser = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const project = await Project.findOne({ owner: id })
			.populate({
				path: 'roles',
				populate: {
					path: 'permissions',
					model: 'Permission',
					select: 'name',
				},
			})
			.populate({
				path: 'users',
				populate: {
					path: 'role',
					model: 'Role',
					select: 'name',
				},
			});
		res.json(project);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

module.exports = {
	getProjects,
	createProject,
	deleteProject,
	getProjectByUser,
	updateProject,
};
