import { userDbModel, accessTokenDbModel, cafeDbModel, bookingDbModel } from "../models";
import makeUserService from "./user.service";
import makeAccessTokenDb from "./access-token.service";
import makeCafeService from "./cafe.service";
import makeBookingService from "./booking.service";

const userService = makeUserService({ userDbModel });
const accessTokenService = makeAccessTokenDb({ accessTokenDbModel });
const cafeService = makeCafeService({ cafeDbModel });
const bookingService = makeBookingService({ bookingDbModel });

export default Object.freeze({ userService, accessTokenService, cafeService, bookingService });

export { userService, accessTokenService, cafeService, bookingService };
