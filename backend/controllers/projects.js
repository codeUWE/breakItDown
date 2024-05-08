const Project = require("../models/projects");

const createProject = async (req, res, next) => {
  try {
    const { title, user, roles, permissions } = req.body;
    const createdProject = await Project.create({
      title,
      user,
      roles,
      permissions,
    });
    res.json(createdProject);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Task.findByIdAndDelete(id);
    res.send(deletedProject);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  getProjects,
  createProject,
  deleteProject,
};
