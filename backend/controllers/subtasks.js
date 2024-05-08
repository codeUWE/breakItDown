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
			})
			.sort('deadline');

		res.json(subtasks);
	} catch (error) {
		console.error('Error fetching subtasks:', error);
		res.status(500).send('Something went wrong!');
	}
};

// / Finding unassigned or empty tasks
	const findUnassignedSubtasks = async (req, res) => {
		try {
			// Logic to find unassigned subtasks
			const unassignedSubtasks = await Subtask.find({ assignee: { $exists: false } })
													.populate("assignee", "name email");
			
			// Return the unassigned subtasks
			return res.json(unassignedSubtasks);
		} catch (error) {
			console.error("Error fetching unassigned subtasks:", error);
			// Log the unassignedSubtasks if there's an error (optional)
			console.log(unassignedSubtasks);
			res.status(500).send("Something went wrong");
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

		// Directly remove the subtask and its reference from the task
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

module.exports = {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
	findUnassignedSubtasks
};
