const Project = require("../models/projects");

const getProject = async (req, res, next) => {
	try {
		if (req.user.project) {
			return next();
		}
		const project = await Project.findOne({ owner: req.user._id });
		req.user.project = project._id;
		next();
	} catch (error) {
		console.log(error);
		res.status(404).send("Project not found");
	}
};

module.exports = { getProject };
