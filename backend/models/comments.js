// models/comments.js
const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		body: { type: String, required: true },
		isDeleted: { type: Boolean, default: false },
		reply: { type: Schema.Types.ObjectId, ref: 'Comment' },
		task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
		subtask: { type: Schema.Types.ObjectId, ref: 'Subtask' },
	},
	{ timestamps: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
