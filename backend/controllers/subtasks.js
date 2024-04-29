const Task = require('../models/tasks');
const Subtask = require('../models/subtasks');

const getSubtasks = async (req, res) => {
	try {
		const subtasks = await Subtask.find({}).populate(
			'task',
			'title description status assignee'
		);
		res.json(subtasks);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const getSubtask = async (req, res) => {
	try {
		const { id } = req.params;
		const subtask = await Subtask.findById(id).populate(
			'task',
			'title description status assignee'
		);
		res.json(subtask);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const createSubtask = async (req, res) => {
	try {
		const { title, description, status, task: taskId } = req.body;
		const createdSubtask = await Subtask.create({
			title,
			description,
			status,
			task: taskId,
		});

		await Task.findByIdAndUpdate(
			taskId,
			{ $push: { subtasks: createdSubtask._id } },
			{ new: true, safe: true, upsert: false }
		);

		res.json(createdSubtask);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const updateSubtask = async (req, res) => {
	try {
		const {
			body,
			params: { id },
		} = req;
		const updatedSubtask = await Subtask.findByIdAndUpdate(id, body, {
			new: true,
		});
		res.send(updatedSubtask);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteSubtask = async (req, res) => {
	try {
		const { id } = req.params;

		const subtask = await Subtask.findById(id);
		if (!subtask) {
			return res.status(404).send('Subtask not found!');
		}

		await Task.findByIdAndUpdate(
			subtask.task,
			{ $pull: { subtasks: subtask._id } },
			{ new: true, safe: true }
		);

		await subtask.remove();

		res.send({ message: 'Subtask deleted successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

module.exports = {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
};
