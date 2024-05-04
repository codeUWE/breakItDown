const { Schema, model } = require('mongoose');

const subtaskSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		detailedInformation: { type: String, required: true },
		deadline: { type: Date },
		status: {
			type: String,
			enum: ['backlog', 'inProgress', 'done'],
			default: 'backlog',
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'low',
		},
		isClosed: { type: Boolean, default: false },
		task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
		assignee: { type: Schema.Types.ObjectId, ref: 'User' },
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{
		timestamps: true,
	}
);

const Subtask = model('Subtask', subtaskSchema);
module.exports = Subtask;
