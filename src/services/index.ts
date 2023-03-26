import { userDbModel, accessTokenDbModel, cafeDbModel, bookingDbModel } from "../models";
import makeUserService from "./user";
import makeAccessTokenDb from "./access-token";
import makeCafeService from "./cafe";
import makeBookingService from "./booking";

const userService = makeUserService({ userDbModel });
const accessTokenService = makeAccessTokenDb({ accessTokenDbModel });
const cafeService = makeCafeService({ cafeDbModel });
const bookingService = makeBookingService({ bookingDbModel });

export default Object.freeze({ userService, accessTokenService, cafeService, bookingService });

export { userService, accessTokenService, cafeService, bookingService };
