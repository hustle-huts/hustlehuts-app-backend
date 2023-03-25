import verifyPassword from "./verify-password";
import hashPassword from "./hash-password";

const passwordServices = Object.freeze({ verifyPassword, hashPassword });

export default passwordServices;

export { verifyPassword, hashPassword };
