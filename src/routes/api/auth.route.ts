import express from "express";
import makeExpressCallback from "../../express-callback";
import { registerUserController, loginUserController, logoutUserController } from "../../controllers/api/auth";

import tokenValidatorMiddleware from "../../middlewares/token-validator.middleware";

const authRouter = express.Router();

authRouter.post("/", makeExpressCallback(registerUserController));
authRouter.post("/login", makeExpressCallback(loginUserController));
authRouter.post("/logout", tokenValidatorMiddleware, makeExpressCallback(logoutUserController));

export default authRouter;
