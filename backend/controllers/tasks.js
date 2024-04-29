const Task = require('../models/tasks');

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({}).populate(
			'subtasks',
			'title description status assignee deadline isClosed'
		);
		res.json(tasks);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const getTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id).populate(
			'subtasks',
			'title description status assignee deadline isClosed'
		);
		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const createTask = async (req, res) => {
	try {
		const { title, description, status } = req.body;
		const createdTask = await Task.create({
			title,
			description,
			status,
		});
		res.json(createdTask);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const updateTask = async (req, res) => {
	try {
		const {
			body,
			params: { id },
		} = req;
		const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
		res.send(updatedTask);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTask = await Task.findByIdAndDelete(id);
		res.send(deletedTask);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
