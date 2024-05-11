const express = require('express');
const { authenticate } = require('../middlewares/auth');

const {
	getTasksForGantt,
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks');

const tasksRouter = express.Router();

tasksRouter.route('/gantt').get(getTasksForGantt);
tasksRouter.route('/').get(getTasks).post(createTask);
tasksRouter
	.route('/:id')
	.get(getTask)
	.put(authenticate, updateTask)
	.delete(deleteTask);

module.exports = tasksRouter;
