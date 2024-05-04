const Subtask = require('../models/subtasks');
const Task = require('../models/tasks');

const getSubtasks = async (req, res) => {
	try {
		const subtasks = await Subtask.find({})
			.populate({
				path: 'task',
				select: 'title description status',
			})
			.populate({
				path: 'assignee',
				select: 'name email',
			});
		res.json(subtasks);
	} catch (error) {
		console.error('Error fetching subtasks:', error);
		res.status(500).send('Something went wrong!');
	}
};

const getSubtask = async (req, res) => {
	try {
		const { id } = req.params;
		const subtask = await Subtask.findById(id)
			.populate({
				path: 'task',
				select: 'title description status',
			})
			.populate({
				path: 'assignee',
				select: 'name email',
			});
		if (!subtask) {
			return res.status(404).send('Subtask not found');
		}
		res.json(subtask);
	} catch (error) {
		console.error('Error fetching subtask:', error);
		res.status(500).send('Something went wrong!');
	}
};

const createSubtask = async (req, res) => {
	try {
		const {
			title,
			description,
			detailedInformation,
			priority,
			status,
			deadline,
			task: taskId,
			assignee,
		} = req.body;
		const createdSubtask = await Subtask.create({
			title,
			description,
			detailedInformation,
			status,
			priority,
			deadline,
			task: taskId,
			assignee,
		});

		// Update the task to include this new subtask
		await Task.findByIdAndUpdate(
			taskId,
			{ $push: { subtasks: createdSubtask._id } },
			{ new: true, safe: true, upsert: false }
		);

		res.json(createdSubtask);
	} catch (error) {
		console.error('Error creating subtask:', error);
		res.status(500).send('Something went wrong!');
	}
};

const updateSubtask = async (req, res) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const updatedSubtask = await Subtask.findByIdAndUpdate(id, body, {
			new: true,
		});
		res.json(updatedSubtask);
	} catch (error) {
		console.error('Error updating subtask:', error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteSubtask = async (req, res) => {
	try {
		const { id } = req.params;
		const subtask = await Subtask.findById(id);
		if (!subtask) {
			return res.status(404).send('Subtask not found');
		}

		// Remove the subtask reference from the task
		await Task.findByIdAndUpdate(
			subtask.task,
			{ $pull: { subtasks: id } },
			{ new: true, safe: true }
		);

		await subtask.remove();
		res.send({ message: 'Subtask deleted successfully' });
	} catch (error) {
		console.error('Error deleting subtask:', error);
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
