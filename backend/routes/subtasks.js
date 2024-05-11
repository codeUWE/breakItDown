const express = require('express');
const { authenticate } = require('../middlewares/auth');
const subtasksRouter = express.Router();

const {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
	findUnassignedSubtasks,
	assignSubtask,
} = require('../controllers/subtasks');
subtasksRouter.use(authenticate);
// Define routes
subtasksRouter.route('/').get(getSubtasks).post(createSubtask);

// Define the route for unassigned subtasks without '/subtasks'
subtasksRouter.route('/unassigned').get(findUnassignedSubtasks);

subtasksRouter
	.route('/:id')
	.patch(assignSubtask)
	.get(getSubtask)
	.put(updateSubtask)
	.delete(deleteSubtask);

module.exports = subtasksRouter;
