const Task = require('../models/tasks');

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({})
			.populate('owner lead', 'name email')
			.populate({
				path: 'collaborators',
				select: 'name email',
			})
			.populate({
				path: 'subtasks',
				select:
					'title description detailedInformation status priority deadline isClosed',
				options: { sort: { deadline: 1 } },
				populate: {
					path: 'assignee',
					select: 'name email',
				},
			});

		const tasksWithProgress = tasks.map((task) => {
			const totalSubtasks = task.subtasks.length;
			const completedSubtasks = task.subtasks.filter(
				(subtask) => subtask.status === 'done'
			).length;
			return {
				...task.toObject(),
				totalSubtasks,
				completedSubtasks,
				progress: `${completedSubtasks}/${totalSubtasks}`,
			};
		});

		res.json(tasksWithProgress);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res.status(500).send('Something went wrong!');
	}
};

const getTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id)
			.populate('owner lead', 'name email')
			.populate({
				path: 'collaborators',
				select: 'name email',
			})
			.populate({
				path: 'subtasks',
				select:
					'title description detailedInformation status priority deadline isClosed',
				options: { sort: { deadline: 1 } }, // Hier fügen wir die Sortierung hinzu
				populate: {
					path: 'assignee',
					select: 'name email',
				},
				// .populate({
				// 	path: 'comments',
				// 	match: { isDeleted: false },
				// 	select: 'body user',
				// 	populate: { path: 'user', select: 'name' },
				// })
				// .populate({
				// 	path: 'notes',
				// 	match: { isDeleted: false, isShared: true },
				// 	select: 'title body tags',
				// });
			});

		if (!task) {
			return res.status(404).send('Task not found');
		}

		const totalSubtasks = task.subtasks.length;
		const completedSubtasks = task.subtasks.filter(
			(subtask) => subtask.status === 'done'
		).length;

		const taskWithProgress = {
			...task.toObject(),
			totalSubtasks,
			completedSubtasks,
			progress: `${completedSubtasks}/${totalSubtasks}`,
		};

		res.json(taskWithProgress);
	} catch (error) {
		console.error('Error fetching task:', error);
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
