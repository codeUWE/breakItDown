require('dotenv/config');
const express = require('express');
const cors = require("cors")
require('./db');

const usersRouter = require('./routes/users');
const roleRouter = require('./routes/roles');
const permissionRouter = require('./routes/permissions')


const app = express();
const port = 3001;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/roles',roleRouter);
app.use('/permissions',permissionRouter)


app.get('/', (req, res) => {
	res.send('Hello World!')
  })

  app.post("/notes",(req, res) => {
	res.json(req.body)
  })

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
