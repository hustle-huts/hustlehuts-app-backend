import mongoose from "mongoose";
import userSchema from "./schemas/user";
import accessTokenSchema from "./schemas/access-token";
import cafeSchema from "./schemas/cafe";
import bookingSchema from "./schemas/booking";
import IUser from "./interfaces/user";
import IAccessToken from "./interfaces/access-token";
import ICafe from "./interfaces/cafe";
import IBooking from "./interfaces/booking";

/* Creating a new model called User using the userSchema. */
const userDbModel = mongoose.model<IUser & mongoose.Document>("User", userSchema);

/* Creating a new model called AccessToken using the accessTokenSchema. */
const accessTokenDbModel = mongoose.model<IAccessToken & mongoose.Document>("AccessToken", accessTokenSchema);

/* Create a new model called Cafe using the cafeSchema. */
const cafeDbModel = mongoose.model<ICafe & mongoose.Document>("Cafe", cafeSchema);

/* Create a new model called Booking using the bookingSchema. */
const bookingDbModel = mongoose.model<IBooking & mongoose.Document>("Booking", bookingSchema);

export default Object.freeze({ userDbModel, accessTokenDbModel, cafeDbModel, bookingDbModel });

export { userDbModel, accessTokenDbModel, cafeDbModel, bookingDbModel };
