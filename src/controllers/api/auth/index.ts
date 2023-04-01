import registerUserController from "../auth/register-user";
import loginUserController from "../auth/login-user";
import logoutUserController from "../auth/logout-user";

const authController = Object.freeze({
  registerUserController,
  loginUserController,
  logoutUserController,
});

export default authController;

export { registerUserController, loginUserController, logoutUserController };
