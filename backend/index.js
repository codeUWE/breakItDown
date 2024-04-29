require('dotenv/config');
const express = require('express');
require('./db');
const app = express();
const port = 3001;


//import Routers
const tasksRouter = require('./routes/tasks');
const subtasksRouter = require('./routes/subtasks');
const commentsRouter = require("./routes/comments");
const notesRouter = require("./routes/notes");

app.use(express.json());


//Routers
app.use('/tasks', tasksRouter);
app.use('/subtasks', subtasksRouter);
app.use("/comments", commentsRouter);
app.use("/notes", notesRouter);


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
