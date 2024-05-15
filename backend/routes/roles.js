const express = require("express");

const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles");

const { authenticate } = require("../middlewares/auth");
const roleRouter = express.Router();
roleRouter.use(authenticate);

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRoleById);
roleRouter.post("/", authenticate, createRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

module.exports = roleRouter;

// 662bb0d9e2fe28690c4a9207
// 662bb331e2fe28690c4a920f
