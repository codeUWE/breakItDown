const express = require('express');

const {
	register,login,logout,getProfile
} = require('../controllers/auth');
const{authenticate} = require("../middlewares/auth")

const authRouter = express.Router();


authRouter.post('/signup', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/profile',authenticate, getProfile);

module.exports = authRouter;