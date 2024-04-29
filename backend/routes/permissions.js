const express = require('express');

const {
	getAllPermissions,getPermissionById,createPermission,updatePermission,deletePermission
} = require('../controllers/permissions');

const permissionRouter = express.Router();

permissionRouter.get('/', getAllPermissions);
permissionRouter.get('/:id', getPermissionById);
permissionRouter.post('/', createPermission);
permissionRouter.put('/:id', updatePermission);
permissionRouter.delete('/:id', deletePermission);

module.exports = permissionRouter;