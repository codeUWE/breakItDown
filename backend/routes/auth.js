const express = require("express");

const { register, login, logout, getProfile } = require("../controllers/auth");
const { authenticate, authorize } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", authenticate, getProfile);

module.exports = authRouter;
