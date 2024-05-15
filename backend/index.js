require('dotenv/config');
require('./db');

const color = require('colors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

//import Routers
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const subtasksRouter = require('./routes/subtasks');
const commentsRouter = require('./routes/comments');
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');
const roleRouter = require('./routes/roles');
const permissionRouter = require('./routes/permissions');
const authRouter = require('./routes/auth');
const newsRouter = require('./routes/news');
const widgetRouter = require('./routes/widgets');

//middlewares
app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:5173'],
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../frontend', 'dist')));
//Routers
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/subtasks', subtasksRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/news', newsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/roles', roleRouter);
app.use('/api/permissions', permissionRouter);
app.use('/api/auth', authRouter);
app.use('/api/widget', widgetRouter);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`.bgGreen);
});
