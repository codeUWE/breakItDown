const { Schema, model } = require('mongoose');
const roleSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	permissions: [
		{ type: Schema.Types.ObjectId, ref: 'Permissions', required: true },
	],
	project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

const Role = model('Role', roleSchema);
module.exports = Role;
