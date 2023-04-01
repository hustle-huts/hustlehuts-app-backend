import createUserController from "../auth/register-user";
import loginUserController from "../auth/login-user";
import logoutUserController from "../auth/logout-user";

const authController = Object.freeze({
  createUserController,
  loginUserController,
  logoutUserController,
});

export default authController;

export { createUserController, loginUserController, logoutUserController };
