const express = require('express');
const subtasksRouter = express.Router();

const {
    getSubtasks,
    getSubtask,
    createSubtask,
    updateSubtask,
    deleteSubtask,
    findUnassignedSubtasks,
} = require('../controllers/subtasks');

// Define routes
subtasksRouter.route('/')
    .get(getSubtasks)
    .post(createSubtask);

// Define the route for unassigned subtasks without '/subtasks'
subtasksRouter.route('/unassigned')
    .get(findUnassignedSubtasks);	

	
subtasksRouter.route('/:id')
    .get(getSubtask)
    .put(updateSubtask)
    .delete(deleteSubtask);



module.exports = subtasksRouter;
