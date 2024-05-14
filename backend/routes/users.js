
const express = require('express');
const upload = require('../middlewares/uploadImage');


const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const usersRouter = express.Router();


usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);
usersRouter.put('/:id', upload.single('profilePicture'), updateUser);
usersRouter.delete('/:id', deleteUser);


module.exports = usersRouter;
