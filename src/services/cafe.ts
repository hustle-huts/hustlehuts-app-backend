/**
 * It takes a cafeDbModel as an argument and returns a class with a bunch of functions that use the
 * cafeDbModel to perform CRUD operations on the database
 * @param  - cafeDbModel: mongoose.Model<ICafe & mongoose.Document>
 * @returns A function that returns a new instance of the class MongooseCafeDb
 */
import mongoose from "mongoose";

import ICafe from "../models/interfaces/cafe";

export default function makeCafeService({ cafeDbModel }: { cafeDbModel: mongoose.Model<ICafe & mongoose.Document> }) {
  return new (class MongooseCafeDb {
    /**
     * It inserts a cafe into the database.
     * @param payload - This is the payload that will be inserted into the database.
     * @returns The return type is a Promise of an array of ICafe objects.
     */
    async insert(payload: Partial<ICafe>): Promise<ICafe | null> {
      const result = await cafeDbModel.create([payload]);
      const updated = await cafeDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * "Find a cafe by id, and return the cafe if found, otherwise return null."
     *
     * The function is async, so it returns a promise
     * @param  - `id` - the id of the cafe to find
     * @returns The cafe object
     */
    async findById({ id }: { id: string }): Promise<ICafe | null> {
      const query_conditions = { _id: id, deleted_at: undefined };
      const existing = await cafeDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * > Finds a cafe by email and type
     * @param  - `email` - the email of the cafe to find
     * @returns The cafe object
     */
    async findByManager({ user_id }: { user_id: string }): Promise<ICafe | null> {
      const query_conditions = { manager: user_id } as any;
      const existing = await cafeDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * It returns all the cafes in the database.
     * @returns An array of cafes.
     */
    async findAll(): Promise<ICafe[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await cafeDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean();
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * It updates a cafe in the database.
     * @param payload - This is the data that is being passed in from the controller.
     * @returns The updated cafe object.
     */
    async update(payload: Partial<ICafe>): Promise<ICafe | null> {
      await cafeDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await cafeDbModel.findById({ _id: payload._id }).lean();
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * Delete a cafe from the database, and return true if the cafe was deleted, or false if the cafe was
     * not deleted.
     * @param  - `id` - the id of the cafe to delete
     * @returns The result of the deleteOne method.
     */
    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await cafeDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    /**
     * It deletes a cafe from the database.
     * @param  - { id: string }
     * @returns The cafe object
     */
    async delete({ id }: { id: string }): Promise<ICafe | null> {
      const existing = await cafeDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() }).lean();
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
