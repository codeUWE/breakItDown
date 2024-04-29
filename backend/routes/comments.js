const express = require("express");

const {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
} = require("../controllers/comments");

const commentsRouter = express.Router();

commentsRouter.route("/").get(getComments).post(createComment);
commentsRouter.route("/:id").get(getComment).put(updateComment).delete(deleteComment);

module.exports = commentsRouter;