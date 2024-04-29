require('dotenv/config');
const express = require('express');
require('./db');

const tasksRouter = require('./routes/tasks');
const subtasksRouter = require('./routes/subtasks');

const app = express();
const port = 3001;
app.use(express.json());

app.use('/tasks', tasksRouter);
app.use('/subtasks', subtasksRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
