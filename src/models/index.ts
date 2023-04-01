import mongoose from "mongoose";
import userSchema from "./schemas/user.schema";
import accessTokenSchema from "./schemas/access-token.schema";
import cafeSchema from "./schemas/cafe.schema";
import bookingSchema from "./schemas/booking.schema";
import IUser from "./interfaces/user.interface";
import IAccessToken from "./interfaces/access-token.interface";
import ICafe from "./interfaces/cafe.interface";
import IBooking from "./interfaces/booking.interface";

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
