const express = require('express');

const {
	getProjects,
	createProject,
	deleteProject,
} = require('../controllers/projects');

const projectsRouter = express.Router();

projectsRouter.route('/').get(getProjects).post(createProject);
projectsRouter.route('/:id').delete(deleteProject);

module.exports = projectsRouter;
