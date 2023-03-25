/**
 * It takes a userDbModel as an argument and returns a class with a bunch of functions that use the
 * userDbModel to perform CRUD operations on the database
 * @param  - userDbModel: mongoose.Model<IUser & mongoose.Document>
 * @returns A function that returns a new instance of the class MongooseUserDb
 */
import mongoose from "mongoose";

import IUser, { UserType } from "../models/interfaces/user";

export default function makeUserService({ userDbModel }: { userDbModel: mongoose.Model<IUser & mongoose.Document> }) {
  return new (class MongooseUserDb {
    /**
     * It inserts a user into the database.
     * @param payload - This is the payload that will be inserted into the database.
     * @returns The return type is a Promise of an array of IUser objects.
     */
    async insertUser(payload: Partial<IUser>): Promise<IUser | null> {
      const result = await userDbModel.create([payload]);
      const updated = await userDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * "Find a user by id, and return the user if found, otherwise return null."
     *
     * The function is async, so it returns a promise
     * @param  - `id` - the id of the user to find
     * @returns The user object
     */
    async findById({ id }: { id: string }): Promise<IUser | null> {
      const query_conditions = { _id: id, deleted_at: undefined };
      const existing = await userDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * > Finds a user by email and type
     * @param  - `email` - the email of the user to find
     * @returns The user object
     */
    async findByEmail({ email, type = UserType.CUSTOMER }: { email: string; type?: UserType }): Promise<IUser | null> {
      const query_conditions = { email, type, deleted_at: undefined };
      const existing = await userDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * > Find a user by email
     * @param  - { email: string }
     * @returns The user object is being returned.
     */
    async findByEmailExists({ email }: { email: string }): Promise<IUser | null> {
      const query_conditions = { email };
      const existing = await userDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * It returns all the users in the database.
     * @returns An array of users.
     */
    async findAll(): Promise<IUser[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await userDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean();
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * "Find all users by their user ids."
     *
     * The first line of the function is a comment. It's a comment that describes the function
     * @param  - `user_ids`: The user ids to find.
     * @returns An array of users
     */
    async findAllByUserIds({ user_ids }: { user_ids: string[] }): Promise<IUser[]> {
      const query_conditions = { deleted_at: undefined, _id: { $in: user_ids } };
      const existing = await userDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean();
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * It updates a user in the database.
     * @param payload - This is the data that is being passed in from the controller.
     * @returns The updated user object.
     */
    async update(payload: Partial<IUser>): Promise<IUser | null> {
      await userDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await userDbModel.findById({ _id: payload._id }).lean();
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * Delete a user from the database, and return true if the user was deleted, or false if the user was
     * not deleted.
     * @param  - `id` - the id of the user to delete
     * @returns The result of the deleteOne method.
     */
    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await userDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    /**
     * It deletes a user from the database.
     * @param  - { id: string }
     * @returns The user object
     */
    async delete({ id }: { id: string }): Promise<IUser | null> {
      const existing = await userDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() }).lean();
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
