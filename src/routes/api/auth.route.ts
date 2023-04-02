import express from "express";
import makeExpressCallback from "../../express-callback";
import { registerUserController, loginUserController, logoutUserController } from "../../controllers/api/auth";

import authenticateUserJWT from "../../middlewares/authenticate-user.middlware";

const authRouter = express.Router();

authRouter.post("/", makeExpressCallback(registerUserController));

authRouter.post("/login", makeExpressCallback(loginUserController));

authRouter.post("/logout", authenticateUserJWT(), makeExpressCallback(logoutUserController));

export default authRouter;
