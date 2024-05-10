const express = require('express');
const {
	getCommentsByTask,
	createComment,
	updateComment,
	deleteComment,
} = require('../controllers/comments');

const commentsRouter = express.Router();

commentsRouter.route('/:id').get(getCommentsByTask); // :id = task ID
commentsRouter.route('/').post(createComment);
commentsRouter.route('/:id').put(updateComment).delete(deleteComment);

module.exports = commentsRouter;
