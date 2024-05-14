const { Schema, model } = require("mongoose");
const projectSchema = new Schema({
  title: { type: String, required: true, unique: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Project = model("Project", projectSchema);
module.exports = Project;
