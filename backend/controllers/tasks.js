const Task = require('../models/tasks');
const Subtask = require('../models/subtasks');
const { buildGanttRow } = require('../utils/gantt');

const getTasks = async (req, res) => {
	try {
		// console.log(req.user);
		const tasks = await Task.find({ project: req.user.project })
			.sort('deadline')
			.populate({
				path: 'owner',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'leader',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'collaborators',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'subtasks',
				select:
					'title description detailedInformation status priority deadline isClosed assignee',
				options: { sort: { deadline: 1 } },
				populate: {
					path: 'assignee',
					select: 'name email profilePicture',
				},
			});

		const tasksWithDetails = tasks.map((task) => {
			const totalSubtasks = task.subtasks.length;
			const completedSubtasks = task.subtasks.filter(
				(subtask) => subtask.status === 'done'
			).length;
			const unassignedSubtasksCount = task.subtasks.filter(
				(subtask) => !subtask.assignee
			).length;

			return {
				...task.toObject(),
				totalSubtasks,
				completedSubtasks,
				unassignedSubtasksCount,
				progress: `${completedSubtasks}/${totalSubtasks}`,
			};
		});

		res.json(tasksWithDetails);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res.status(500).send('Something went wrong!');
	}
};

const getTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id)
			.populate({
				path: 'owner',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'leader',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'collaborators',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'subtasks',
				select:
					'title description detailedInformation status priority deadline isClosed assignee',
				populate: {
					path: 'assignee',
					select: 'name email profilePicture',
				},
			});

		if (!task) {
			return res.status(404).send('Task not found');
		}

		const totalSubtasks = task.subtasks.length;
		const completedSubtasks = task.subtasks.filter(
			(subtask) => subtask.status === 'done'
		).length;
		const unassignedSubtasksCount = await Subtask.countDocuments({
			task: id,
			assignee: null, // Nur Subtasks zählen, die keinen Assignee haben
			status: 'backlog',
			isClosed: false,
		});

		const taskWithDetails = {
			...task.toObject(),
			totalSubtasks,
			completedSubtasks,
			progress: `${completedSubtasks}/${totalSubtasks}`,
			unassignedSubtasksCount,
		};

		res.json(taskWithDetails);
	} catch (error) {
		console.error('Error fetching task:', error);
		res.status(500).send('Something went wrong!');
	}
};

const getTasksForGantt = async (req, res) => {
	try {
		const query = req.user?.project ? { project: req.user.project } : {};
		const tasks = await Task.find(query)
			.select('title startDate deadline subtasks')
			.populate('subtasks', 'status')
			.lean();

		const tasksWithGanttData = tasks.map((task) => buildGanttRow(task));

		res.json([columns, ...tasksWithGanttData]);
	} catch (error) {
		console.error('Error fetching tasks for Gantt:', error);
		res.status(500).send('Something went wrong!');
	}
};

const columns = [
	{ type: 'string', label: 'Task ID' },
	{ type: 'string', label: 'Task Name' },
	{ type: 'date', label: 'Start Date' },
	{ type: 'date', label: 'End Date' },
	{ type: 'number', label: 'Duration' },
	{ type: 'number', label: 'Percent Complete' },
	{ type: 'string', label: 'Dependencies' },
];

const createTask = async (req, res) => {
	try {
		const {
			title,
			description,
			status,
			startDate,
			deadline,
			leader,
			collaborators,
		} = req.body;
		const createdTask = await Task.create({
			title,
			description,
			status,
			startDate,
			deadline,
			leader,
			collaborators,
			project: req.user.project,
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

		if (!id) {
			return res.status(400).send('Task ID is required');
		}

		const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true })
			.populate({
				path: 'owner',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'leader',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'collaborators',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'comments',
				match: { isDeleted: false },
				select: 'body user createdAt',
				options: { sort: { createdAt: 1 } }, // sort by creation date
				populate: { path: 'user', select: 'name' },
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

		if (!updatedTask) {
			return res.status(404).send('Task not found');
		}

		res.json(updatedTask);
	} catch (error) {
		console.error('Error updating task:', error);
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

const toggleTaskClosed = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id)
			.populate({
				path: 'owner',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'leader',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'collaborators',
				select: 'name email profilePicture',
			})
			.populate({
				path: 'comments',
				match: { isDeleted: false },
				select: 'body user createdAt',
				options: { sort: { createdAt: 1 } }, // sort by creation date
				populate: { path: 'user', select: 'name' },
			})
			.populate({
				path: 'subtasks',
				select:
					'title description detailedInformation status priority deadline isClosed',
				options: { sort: { deadline: 1 } },
				populate: {
					path: 'assignee',
					select: 'name email profilePicture',
				},
			});
		if (!task) {
			return res.status(404).send('Task not found');
		}
		task.isClosed = !task.isClosed;
		await task.save();
		res.json(task);
	} catch (error) {
		console.error('Error toggling task closed state:', error);
		res.status(500).send('Something went wrong!');
	}
};

const getWidgetInfo = async (req, res) => {
	try {
		const openTasksCount = await Task.countDocuments({
			project: req.user.project,
			isClosed: false,
		});

		const nextTask = await Task.findOne({
			project: req.user.project,
			deadline: { $gte: new Date() },
			isClosed: false,
		})
			.sort({ deadline: 1 })
			.select('deadline');

		let daysUntilNextDeadline = null;
		if (nextTask && nextTask.deadline) {
			const today = new Date();
			const deadline = new Date(nextTask.deadline);
			const timeDiff = deadline - today;
			daysUntilNextDeadline = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		}

		res.json({
			openTasksCount: openTasksCount > 0 ? openTasksCount : '00',
			daysUntilNextDeadline:
				daysUntilNextDeadline !== null ? daysUntilNextDeadline : '00',
		});
	} catch (error) {
		console.error('Error fetching widget info:', error);
		res.status(500).send('Something went wrong!');
	}
};

module.exports = {
	getTasks,
	getTask,
	getTasksForGantt,
	createTask,
	updateTask,
	deleteTask,
	toggleTaskClosed,
	getWidgetInfo,
};
