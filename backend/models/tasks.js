const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		startDate: { type: Date },
		deadline: { type: Date },
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		leader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		status: {
			type: String,
			enum: ['backlog', 'inProgress', 'done'],
			default: 'backlog',
		},
		subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }],
		isClosed: { type: Boolean, default: false },
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{
		timestamps: true,
	}
);

const Task = model('Task', taskSchema);

module.exports = Task;
