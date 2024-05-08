const { Schema, model } = require('mongoose');
const projectSchema = new Schema({
    title: { type: String, required: true, unique: true },
    user: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role', required: true }],
    permissions: [
        { type: Schema.Types.ObjectId, ref: 'Permission', required: true },
    ],
});

const Project = model('Project', projectSchema);
module.exports = Project;

