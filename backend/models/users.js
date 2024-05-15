/* eslint-disable no-undef */
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  profilePicture: { type: String },
  socialConnections: [{ type: String }],
  availability: {
    type: String,
    enum: ["available", "busy", "invisible"],
    default: "available",
  },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project"}
});

const User = model("User", userSchema);
module.exports = User;

//6638c67afaa357797969b501,662bc0e4e2f80bbd2cb97d91