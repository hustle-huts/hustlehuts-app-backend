import express from "express";
import makeExpressCallback from "../../express-callback";
import { getUserController, updateUserController, getUserByEmailController } from "../../controllers/api/user";

import tokenValidatorMiddleware from "../../middlewares/token-validator.middleware";

const userRouter = express.Router();

userRouter.get("/auth", tokenValidatorMiddleware, makeExpressCallback(getUserController));
userRouter.get("/email/:email", tokenValidatorMiddleware, makeExpressCallback(getUserByEmailController));
userRouter.get("/:user_id", tokenValidatorMiddleware, makeExpressCallback(getUserController));
userRouter.put("/", tokenValidatorMiddleware, makeExpressCallback(updateUserController));

export default userRouter;
