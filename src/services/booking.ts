/**
 * It takes a bookingDbModel as an argument and returns a class with a bunch of functions that use the
 * bookingDbModel to perform CRUD operations on the database
 * @param  - bookingDbModel: mongoose.Model<IBooking & mongoose.Document>
 * @returns A function that returns a new instance of the class MongooseBookingDb
 */
import mongoose from "mongoose";

import IBooking from "../models/interfaces/booking";

export default function makeBookingService({
  bookingDbModel,
}: {
  bookingDbModel: mongoose.Model<IBooking & mongoose.Document>;
}) {
  return new (class MongooseBookingDb {
    /**
     * It inserts a booking into the database.
     * @param payload - This is the payload that will be inserted into the database.
     * @returns The return type is a Promise of an array of IBooking objects.
     */
    async insert(payload: Partial<IBooking>): Promise<IBooking | null> {
      const result = await bookingDbModel.create([payload]);
      const updated = await bookingDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * "Find a booking by id, and return the booking if found, otherwise return null."
     *
     * The function is async, so it returns a promise
     * @param  - `id` - the id of the booking to find
     * @returns The booking object
     */
    async findById({ id }: { id: string }): Promise<IBooking | null> {
      const query_conditions = { _id: id, deleted_at: undefined };
      const existing = await bookingDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * It returns all the bookings in the database.
     * @returns An array of bookings.
     */
    async findAll(): Promise<IBooking[]> {
      const query_conditions = { deleted_at: undefined };
      const existing = await bookingDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean();
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * It updates a booking in the database.
     * @param payload - This is the data that is being passed in from the controller.
     * @returns The updated booking object.
     */
    async update(payload: Partial<IBooking>): Promise<IBooking | null> {
      await bookingDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await bookingDbModel.findById({ _id: payload._id }).lean();
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * Delete a booking from the database, and return true if the booking was deleted, or false if the booking was
     * not deleted.
     * @param  - `id` - the id of the booking to delete
     * @returns The result of the deleteOne method.
     */
    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await bookingDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    /**
     * It deletes a booking from the database.
     * @param  - { id: string }
     * @returns The booking object
     */
    async delete({ id }: { id: string }): Promise<IBooking | null> {
      const existing = await bookingDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() }).lean();
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
