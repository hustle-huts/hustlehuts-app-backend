import registerUserController from "../auth/register-user";
import loginUserController from "../auth/login-user";
import logoutUserController from "../auth/logout-user";
import loginUserByProviderController from "./login-user-by-provider";

const authController = Object.freeze({
  registerUserController,
  loginUserController,
  logoutUserController,
  loginUserByProviderController,
});

export default authController;

export { registerUserController, loginUserController, logoutUserController, loginUserByProviderController };
