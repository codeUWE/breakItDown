const Subtask = require('../models/subtasks');
const Task = require('../models/tasks');

const updateTaskStatusBasedOnSubtasks = async (taskId) => {
	try {
		const task = await Task.findById(taskId).populate('subtasks');
		if (!task) {
			console.log('Task not found');
			return;
		}

		let newStatus = '';
		const subtaskStatuses = task.subtasks.map((subtask) => subtask.status);

		if (subtaskStatuses.every((status) => status === 'done')) {
			newStatus = 'done';
		} else if (subtaskStatuses.some((status) => status === 'done')) {
			newStatus = 'inProgress';
		} else if (subtaskStatuses.every((status) => status === 'backlog')) {
			newStatus = 'backlog';
		} else {
			newStatus = 'inProgress';
		}

		task.status = newStatus;
		await task.save();
		console.log(`Task ${task._id} status updated to ${newStatus}`);
	} catch (error) {
		console.error('Error updating task status based on subtasks:', error);
	}
};

const getSubtasks = async (req, res) => {
	try {
		const subtasks = await Subtask.find({})
			.populate('task', 'title description status')
			.populate('assignee', 'name email')
			.sort('deadline');

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
			.populate('task', 'title description status')
			.populate('assignee', 'name email');
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
			task,
			assignee,
		} = req.body;
		console.log(
			title,
			description,
			detailedInformation,
			priority,
			status,
			deadline,
			task,
			assignee
		);
		const createdSubtask = await Subtask.create({
			title,
			description,
			detailedInformation,
			status,
			priority,
			task,
			assignee,
		});

		await Task.findByIdAndUpdate(
			task,
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

		// Update Task Status if the subtask is updated
		if (updatedSubtask) {
			await updateTaskStatusBasedOnSubtasks(updatedSubtask.task);
		}

		res.json(updatedSubtask);
	} catch (error) {
		console.error('Error updating subtask:', error);
		res.status(500).send('Something went wrong!');
	}
};

const assignSubtask = async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req;
		const assignedSubtask = await Subtask.findByIdAndUpdate(
			id,
			{ assignee: user.id },
			{
				new: true,
			}
		);

		// Update Task Status if the subtask is updated
		if (assignedSubtask) {
			await updateTaskStatusBasedOnSubtasks(assignedSubtask.task);
		}

		res.json(assignedSubtask);
	} catch (error) {
		console.error('Error updating subtask:', error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteSubtask = async (req, res) => {
	try {
		const { id } = req.params;
		const subtask = await Subtask.findByIdAndDelete(id);
		if (!subtask) {
			return res.status(404).send('Subtask not found');
		}

		await Task.findByIdAndUpdate(
			subtask.task,
			{ $pull: { subtasks: id } },
			{ new: true, safe: true }
		);
		res.send({ message: 'Subtask deleted successfully', deletedSubtaskId: id });
	} catch (error) {
		console.error('Error deleting subtask:', error);
		res.status(500).send('Something went wrong!');
	}
};

const findUnassignedSubtasks = async (req, res) => {
	try {
		// Logic to find unassigned subtasks
		const unassignedSubtasks = await Subtask.find({
			assignee: { $exists: false },
		}).populate('assignee', 'name email');

		// Return the unassigned subtasks
		return res.json(unassignedSubtasks);
	} catch (error) {
		console.error('Error fetching unassigned subtasks:', error);
		// Log the unassignedSubtasks if there's an error (optional)
		console.log(unassignedSubtasks);
		res.status(500).send('Something went wrong');
	}
};

module.exports = {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
	findUnassignedSubtasks,
	assignSubtask,
};
