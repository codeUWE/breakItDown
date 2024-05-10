const Comment = require('../models/comments');
const Task = require('../models/tasks');

const getCommentsByTask = async (req, res) => {
	try {
		const { id } = req.params; // Task ID
		const comments = await Comment.find({ task: id })
			.sort({ createdAt: 'asc' })
			.populate('user', 'name profilePicture')
			.populate('task', 'title description')
			.populate({
				path: 'reply',
				select: 'body user',
				populate: { path: 'user', select: 'name profilePicture' },
			});
		res.json(comments);
	} catch (error) {
		console.error('Error fetching comments:', error);
		res.status(500).send('Something went wrong!');
	}
};

// Erstelle einen neuen Kommentar und füge ihn zur Task hinzu
const createComment = async (req, res) => {
	try {
		const { body, user, reply, task, subtask } = req.body;
		const newComment = await Comment.create({
			body,
			user,
			reply,
			task,
			subtask,
		});

		// Aktualisiere die Task mit dem neuen Kommentar
		await Task.findByIdAndUpdate(task, { $push: { comments: newComment._id } });

		res.status(201).json(newComment);
	} catch (error) {
		console.error('Error creating comment:', error);
		res.status(500).send('Something went wrong!');
	}
};

const updateComment = async (req, res) => {
	try {
		const {
			body,
			params: { id },
		} = req;
		const comment = await Comment.findByIdAndUpdate(id, body, {
			new: true,
		});
		res.json(comment);
	} catch (error) {
		console.error('Error updating comment:', error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteComment = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Comment.findByIdAndDelete(id);

		if (result) {
			// Entferne den Kommentar auch aus der zugehörigen Task
			await Task.findByIdAndUpdate(result.task, { $pull: { comments: id } });
		}

		res.json(result);
	} catch (error) {
		console.error('Error deleting comment:', error);
		res.status(500).send('Something went wrong!');
	}
};

module.exports = {
	getCommentsByTask,
	createComment,
	updateComment,
	deleteComment,
};
