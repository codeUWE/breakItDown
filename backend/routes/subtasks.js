const { Router } = require('express');
const { authenticate } = require('../middlewares/auth');
const { getProject } = require('../middlewares/getProject');
const {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
	assignSubtask,
	getUnassignedSubtasks,
} = require('../controllers/subtasks');

const subtasksRouter = Router();

subtasksRouter
	.route('/')
	.get(authenticate, getProject, getSubtasks)
	.post(authenticate, getProject, createSubtask);
subtasksRouter
	.route('/unassigned')
	.get(authenticate, getProject, getUnassignedSubtasks);
subtasksRouter
	.route('/:id')
	.get(getSubtask)
	.put(authenticate, getProject, updateSubtask)
	.delete(authenticate, getProject, deleteSubtask);

subtasksRouter
	.route('/:id/assign')
	.patch(authenticate, getProject, assignSubtask);

module.exports = subtasksRouter;
