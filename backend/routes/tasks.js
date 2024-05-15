const express = require('express');
const { authenticate } = require('../middlewares/auth');

const { getProject } = require('../middlewares/getProject');

const {
	getTasksForGantt,
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
	toggleTaskClosed,
} = require('../controllers/tasks');

const tasksRouter = express.Router();

tasksRouter.route('/gantt').get(authenticate, getProject, getTasksForGantt);
tasksRouter
	.route('/')
	.get(authenticate, getProject, getTasks)
	.post(authenticate, getProject, createTask);
tasksRouter
	.route('/:id')
	.get(getTask)
	.put(authenticate, updateTask)
	.delete(deleteTask);
tasksRouter.route('/:id/toggleClosed').put(toggleTaskClosed);

module.exports = tasksRouter;
