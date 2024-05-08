
require('dotenv/config');
require('./db');
const color = require('colors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3001;

//import Routers
const projectsRouter = require("./routes/projects");
const tasksRouter = require("./routes/tasks");
const subtasksRouter = require("./routes/subtasks");
const commentsRouter = require("./routes/comments");
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");
const roleRouter = require("./routes/roles");
const permissionRouter = require("./routes/permissions");
const authRouter = require("./routes/auth");
const newsRouter = require ("./routes/news");


//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

//Routers
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);
app.use("/subtasks", subtasksRouter);
app.use("/comments", commentsRouter);
app.use('/news', newsRouter);
app.use("/notes", notesRouter);
app.use("/users", usersRouter);
app.use("/roles", roleRouter);
app.use("/permissions", permissionRouter);
app.use("/auth", authRouter);

// // Constructing image Url for each users
// const users = usersRouter;
// // Construct image URL for each Pokémon entry
// function constructImageUrl(userId) {
//   return `https://randomuser.me/api/portraits/med/men/users/${userId}.png`;
// }

// user.forEach((user) => {
//   const imageUrl = constructImageUrl(user.id);
//   user.image_url = imageUrl;
// });


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`.bgGreen);
});
