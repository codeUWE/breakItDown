const express = require('express');

const {
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks');

const tasksRouter = express.Router();

tasksRouter.route('/').get(getTasks).post(createTask);
tasksRouter.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = tasksRouter;
