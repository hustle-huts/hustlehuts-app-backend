import express from "express";
import makeExpressCallback from "../../express-callback";
import { getUserController, updateUserController, getUserByEmailController } from "../../controllers/api/user";

import authenticateUserJWT from "../../middlewares/authenticate-user.middlware";

const userRouter = express.Router();

userRouter.get("/auth", authenticateUserJWT(), makeExpressCallback(getUserController));

userRouter.get("/email/:email", authenticateUserJWT(), makeExpressCallback(getUserByEmailController));

userRouter.get("/:user_id", authenticateUserJWT(), makeExpressCallback(getUserController));

userRouter.put("/", authenticateUserJWT(), makeExpressCallback(updateUserController));

export default userRouter;
