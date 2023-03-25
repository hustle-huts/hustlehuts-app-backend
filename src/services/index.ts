import { userDbModel, accessTokenDbModel } from "../models";
import makeUserService from "./user";
import makeAccessTokenDb from "./access-token";

const userService = makeUserService({ userDbModel });
const accessTokenService = makeAccessTokenDb({ accessTokenDbModel });

export default Object.freeze({ userService, accessTokenService });

export { userService, accessTokenService };
