require('dotenv/config');
const express = require('express');
require('./db');

const commentsRouter = require("./routes/comments");

const notesRouter = require("./routes/notes");

const app = express();
const port = 3001;
app.use(express.json());

app.use("/comments", commentsRouter);

app.use("/notes", notesRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
