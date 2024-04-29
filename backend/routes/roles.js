const express = require('express');

const {
	getAllRoles,getRoleById,createRole,updateRole,deleteRole
} = require('../controllers/roles');

const roleRouter = express.Router();

roleRouter.get('/', getAllRoles);
roleRouter.get('/:id', getRoleById);
roleRouter.post('/', createRole);
roleRouter.put('/:id', updateRole);
roleRouter.delete('/:id', deleteRole);

module.exports = roleRouter;