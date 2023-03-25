import createUserController from "./create-user";
import getUsersController from "./get-users";
import getUserController from "./get-user";
import updateUserController from "./update-user";
import deleteUserController from "./delete-user";
import hardDeleteUserController from "./hard-delete-user";

const userController = Object.freeze({
  createUserController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  updateUserController,
});

export default userController;

export {
  createUserController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  updateUserController,
};
