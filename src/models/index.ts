import mongoose from "mongoose";
import userSchema from "./schemas/user";
import accessTokenSchema from "./schemas/access-token";
import IUser from "./interfaces/user";
import IAccessToken from "./interfaces/access-token";

/* Creating a new model called User using the userSchema. */
const userDbModel = mongoose.model<IUser & mongoose.Document>("User", userSchema);

/* Creating a new model called AccessToken using the accessTokenSchema. */
const accessTokenDbModel = mongoose.model<IAccessToken & mongoose.Document>("AccessToken", accessTokenSchema);

export default Object.freeze({ userDbModel, accessTokenDbModel });

export { userDbModel, accessTokenDbModel };
