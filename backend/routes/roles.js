const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { getProject } = require('../middlewares/getProject');

const {
	getAllRoles,
	getRoleById,
	createRole,
	updateRole,
	deleteRole,
} = require('../controllers/roles');

const roleRouter = express.Router();
roleRouter.use(authenticate);

roleRouter.get('/', authenticate, getProject, getAllRoles);
roleRouter.get('/:id', getRoleById);
roleRouter.post('/', authenticate, getProject, createRole);
roleRouter.put('/:id', updateRole);
roleRouter.delete('/:id', deleteRole);

module.exports = roleRouter;

// 662bb0d9e2fe28690c4a9207
// 662bb331e2fe28690c4a920f
