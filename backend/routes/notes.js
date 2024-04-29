const express = require("express");

const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/notes");

const notesRouter = express.Router();

notesRouter.route("/").get(getNotes).post(createNote);
notesRouter.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

module.exports = notesRouter;