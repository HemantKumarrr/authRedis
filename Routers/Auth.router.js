const AuthController = require("../Controllers/Auth.controller");
const { Router } = require("express");
const { verifyAccessToken } = require('../helpers/jwt_helper')
const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);

AuthRouter.post("/login", AuthController.login);

AuthRouter.delete("/logout", AuthController.logout);

AuthRouter.post("/refresh-token", AuthController.refresh_token);

module.exports = AuthRouter;
