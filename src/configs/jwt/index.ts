import generateJWTToken from "./generate-jwt-token";
import verifyJWTToken from "./verify-jwt-token";

const tokenServices = Object.freeze({ generateJWTToken, verifyJWTToken });

export default tokenServices;
export { generateJWTToken, verifyJWTToken };
