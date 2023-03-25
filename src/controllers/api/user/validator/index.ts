import getUserRules from "./get-user";
import getUserByEmailRules from "./get-user-by-email";
import createUserRules from "./create-user";
import loginUserRules from "./login-user";
import updateUserRules from "./update-user";

export default Object.freeze({
  getUserRules,
  createUserRules,
  getUserByEmailRules,
  loginUserRules,
  updateUserRules,
});

export { getUserRules, createUserRules, getUserByEmailRules, loginUserRules, updateUserRules };
