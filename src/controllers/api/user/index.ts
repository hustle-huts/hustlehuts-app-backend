import getUserController from "./get-user";
import updateUserController from "./update-user";
import getUserByEmailController from "./get-user-by-email";

const userController = Object.freeze({
  getUserController,
  updateUserController,
  getUserByEmailController,
});

export default userController;

export { getUserController, updateUserController, getUserByEmailController };
