const { Router } = require('express');
const { authenticate } = require('../middlewares/auth');
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

subtasksRouter.route('/').get(getSubtasks).post(createSubtask);
subtasksRouter.route('/unassigned').get(getUnassignedSubtasks); // Neue Route für unbelegte Subtasks
subtasksRouter
	.route('/:id')
	.get(getSubtask)
	.put(authenticate, updateSubtask)
	.delete(deleteSubtask);

subtasksRouter.route('/:id/assign').patch(authenticate, assignSubtask);

module.exports = subtasksRouter;
