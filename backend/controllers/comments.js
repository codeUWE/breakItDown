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

const createComment = async (req, res) => {
	try {
		const { body, user, reply, task, subtask } = req.body;

		// Erstellen des neuen Kommentars
		const newComment = await Comment.create({
			body,
			user,
			reply,
			task,
			subtask,
		});

		// Aktualisieren des Tasks durch Hinzufügen der Kommentar-ID zum 'comments' Array
		const updatedTask = await Task.findByIdAndUpdate(
			task,
			{ $push: { comments: newComment._id } },
			{ new: true, safe: true, upsert: true } // Stellen Sie sicher, dass der Task vorhanden ist; falls nicht, wird ein Fehler geworfen.
		);

		// Überprüfen, ob der Task gefunden und aktualisiert wurde
		if (!updatedTask) {
			console.error('Task not found with id:', task);
			return res.status(404).send('Task not found');
		}

		// Antwort mit dem neu erstellten Kommentar
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
		})
			.sort({ createdAt: 'asc' })
			.populate('user', 'name profilePicture')
			.populate('task', 'title description')
			.populate({
				path: 'reply',
				select: 'body user',
				populate: { path: 'user', select: 'name profilePicture' },
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
