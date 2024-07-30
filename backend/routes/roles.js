const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { getProject } = require("../middlewares/getProject");
const {
	getAllRoles,
	getRoleById,
	createRole,
	updateRole,
	deleteRole,
} = require("../controllers/roles");

const roleRouter = express.Router();

roleRouter.get("/", authenticate, getProject, getAllRoles);
roleRouter.get("/:id", authenticate, getProject, getRoleById);
roleRouter.post("/", authenticate, getProject, createRole);
roleRouter.put("/:id", authenticate, getProject, updateRole);
roleRouter.delete("/:id", authenticate, getProject, deleteRole);

module.exports = roleRouter;
