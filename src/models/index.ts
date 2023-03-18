import mongoose from "mongoose";
import userSchema from "./schemas/user";
import IUser from "./interfaces/user";

const userDbModel = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default Object.freeze({ userDbModel });

export { userDbModel };
