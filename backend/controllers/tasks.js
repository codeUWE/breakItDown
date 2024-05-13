const Task = require('../models/tasks');
const Subtask = require('../models/subtasks');

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({})
			.sort('deadline')
			.populate('owner leader', 'name email profilePicture')
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
					select: 'name email',
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
			.populate('owner leader', 'name email')
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
					select: 'name email',
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
		const tasks = await Task.find({})
			.select('title startDate deadline subtasks')
			.populate('subtasks', 'status')
			.lean();

		const tasksWithGanttData = tasks.map((task) => {
			// Start- und Enddatum zu Date-Objekten umwandeln
			const startDate = task.startDate ? new Date(task.startDate) : null;
			const endDate = task.deadline ? new Date(task.deadline) : null;

			// Dauer berechnen, falls keine Daten vorhanden sind
			const duration = startDate && endDate ? null : daysToMilliseconds(3);

			// Berechnung des Fortschritts in Prozent
			const totalSubtasks = task.subtasks.length;
			const completedSubtasks = task.subtasks.filter(
				(subtask) => subtask.status === 'done'
			).length;
			const percentComplete =
				totalSubtasks > 0
					? Math.round((completedSubtasks / totalSubtasks) * 100)
					: 0;

			return [
				task._id.toString(), // Task ID
				task.title, // Task Name
				{
					v: `Date(${startDate.getFullYear()}, ${startDate.getMonth()}, ${startDate.getDate()})`,
				}, // Start Date
				{
					v: `Date(${endDate.getFullYear()}, ${endDate.getMonth()}, ${endDate.getDate()})`,
				}, // End Date
				duration, // Duration
				percentComplete, // Percent Complete
				null, // Dependencies
			];
		});

		res.json([columns, ...tasksWithGanttData]);
	} catch (error) {
		console.error('Error fetching tasks for Gantt:', error);
		res.status(500).send('Something went wrong!');
	}
};

function daysToMilliseconds(days) {
	return days * 24 * 60 * 60 * 1000;
}

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
			.populate('owner leader', 'name email')
			.populate({
				path: 'collaborators',
				select: 'name email',
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

module.exports = {
	getTasks,
	getTask,
	getTasksForGantt,
	createTask,
	updateTask,
	deleteTask,
};
