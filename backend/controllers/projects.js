const Project = require("../models/projects");

const createProject = async (req, res, next) => {
  try {
    console.log(1111111111111);
    const { title, users = [], roles = [] } = req.body;
    console.log({
      title,
      users,
      roles,
      owner: req.user.id,
    });
    const createdProject = await Project.create({
      title,
      users,
      roles,
      owner: req.user.id,
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
    const deletedProject = await Project.findByIdAndDelete(id);
    res.send(deletedProject);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

const getProjectByUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const project = await Project.findOne({ owner: id });
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};
// const getProjectRole = async(req,res) =>{
//   const { id } = req.params;
// 		const role = await Project.findById(id).populate({
// 			path: 'permissions',
// 			populate: {
// 				path: 'permissions',
// 				model: 'Permission',
// 				select: 'name',
// 			},
// 		});

// 		res.json(user);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json('Something went wrong');
// 	}

// const updateProjectRole = async (req,res) =>{
//   try {
// 		const {
// 			body,
// 			params: { id },
// 		} = req;
// 		const updatedProject = await Project.findByIdAndUpdate(id, body, { new: true });
// 		res.send(updatedProject);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json('Something went wrong');
// 	}
// }
// const deleteProjectRole = async (req,res) =>{
//   try {
//     const { id } = req.params;
//     const deletedProject = await Project.findByIdAndDelete(id);
//     res.send(deletedProject);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Something went wrong!");
//   }

module.exports = {
  getProjects,
  createProject,
  deleteProject,
  getProjectByUser,
  // getProjectRole,
  // updateProjectRole,
  // deleteProjectRole
};
