const express = require("express");

const {
  getProjects,
  createProject,
  deleteProject,
  getProjectByUser,
  updateProject,
  // getProjectRole,
  // updateProjectRole,
  // deleteProjectRole,
} = require("../controllers/projects");

const { authenticate } = require("../middlewares/auth");
const projectsRouter = express.Router();
projectsRouter.use(authenticate);
projectsRouter.route("/").get(getProjects).post(authenticate, createProject);
projectsRouter.route("/:id").delete(deleteProject).put(updateProject);
projectsRouter.route("/users/:id").get(getProjectByUser);

// .get(getProjectRole)
// .delete(deleteProjectRole)
// .put(updateProjectRole);

module.exports = projectsRouter;
