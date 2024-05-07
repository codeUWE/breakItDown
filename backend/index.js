require("dotenv/config");
require("./db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
app.use("/notes", notesRouter);
app.use("/users", usersRouter);
app.use("/roles", roleRouter);
app.use("/permissions", permissionRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
