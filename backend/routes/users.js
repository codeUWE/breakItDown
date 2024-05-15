const express = require('express');
const upload = require('../middlewares/uploadImage');
const { authenticate } = require('../middlewares/auth');
const { getProject } = require('../middlewares/getProject');

const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', authenticate, getProject, getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);
usersRouter.put('/:id', upload.single('profilePicture'), updateUser);
usersRouter.delete('/:id', authenticate, getProject, deleteUser);

module.exports = usersRouter;
