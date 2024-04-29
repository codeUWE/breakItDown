const express = require('express');

const {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
} = require('../controllers/subtasks');

const subtasksRouter = express.Router();

subtasksRouter.route('/').get(getSubtasks).post(createSubtask);
subtasksRouter
	.route('/:id')
	.get(getSubtask)
	.put(updateSubtask)
	.delete(deleteSubtask);

module.exports = subtasksRouter;
