/**
 * It takes a bookingDbModel as an argument and returns a class with a bunch of functions that use the
 * bookingDbModel to perform CRUD operations on the database
 * @param  - bookingDbModel: mongoose.Model<IBooking & mongoose.Document>
 * @returns A function that returns a new instance of the class MongooseBookingDb
 */
import _ from "lodash";
import mongoose from "mongoose";
import { IBookingService } from "./interfaces/booking";
import IBooking, { PaginatedBookingResult } from "../models/interfaces/booking.interface";

export default function makeBookingService({
  bookingDbModel,
}: {
  bookingDbModel: mongoose.Model<IBooking & mongoose.Document>;
}) {
  return new (class MongooseBookingDb implements IBookingService {
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
     * "Find a booking by cafe and user."
     *
     * The function is async, so it returns a promise
     * @param  - { cafe_id: string; user_id: string }
     * @returns a promise that resolves to an IBooking or null.
     */
    async findByCafeAndUser({ cafe_id, user_id }: { cafe_id: string; user_id: string }): Promise<IBooking | null> {
      const query_conditions = { cafe: cafe_id, user: user_id, deleted_at: undefined };
      const existing = await bookingDbModel.findOne(query_conditions).lean();
      if (existing) {
        return existing;
      }
      return null;
    }

    /**
     * "Find all bookings for a given cafe, sorted by most recently updated."
     *
     * The function takes a single argument, an object with a single property, `cafe_id`. The function
     * returns a promise that resolves to an array of bookings
     * @param  - `cafe_id` is the id of the cafe that we want to find all bookings for.
     * @returns An array of Bookings
     */
    async findAllByCafe({ cafe_id }: { cafe_id: string }): Promise<IBooking[]> {
      const query_conditions = { cafe: cafe_id, deleted_at: undefined };
      const existing = await bookingDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean();
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * "Find all bookings by user id."
     *
     * The function is async, so it returns a promise
     * @param  - `user_id` is the user id of the user whose bookings we want to find.
     * @returns An array of Bookings
     */
    async findAllByUser({ user_id }: { user_id: string }): Promise<IBooking[]> {
      const query_conditions = { user: user_id, deleted_at: undefined };
      const existing = await bookingDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean();
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * @description This is used by user's API only
     * @param param0
     * @param param1
     */
    async findAllPaginated(
      {
        user_id,
        cafe_id,
        sort_by,
      }: {
        user_id?: string;
        cafe_id?: string;
        sort_by?: string;
      },
      { page = 1, entries_per_page = 9 }: { page: number; entries_per_page?: number },
    ): Promise<PaginatedBookingResult | null> {
      const query_conditions = { deleted_at: undefined };
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      if (user_id) {
        query_conditions["user"] = user_id;
      }

      if (cafe_id) {
        query_conditions["cafe"] = cafe_id;
      }

      let sort_query: Record<string, any> = {};
      if (sort_by) {
        const sort_query_array = _.split(sort_by, ",") || [];
        sort_query_array.map((sort_query_item) => {
          const sort_conditions_array = sort_query_item.split("_");
          const sort_key = _.drop(sort_conditions_array).join("_");
          const sort_value = sort_conditions_array[0];
          let sort_direction = "desc"; // descending
          if (sort_value === "min") {
            sort_direction = "asc"; // ascending
          }
          Object.assign(sort_query, { [`${sort_key}`]: sort_direction });
        });
      } else {
        sort_query = { created_at: "desc" }; // Default to created_at
      }

      const existing = await bookingDbModel
        .find(query_conditions)
        .populate({ path: "cafe" })
        .populate({ path: "user" })
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort(sort_query)
        .lean({ virtuals: true });

      const total_count = await bookingDbModel.countDocuments(query_conditions);

      if (existing) {
        const from = page - 1 > 0 ? page - 1 : null;
        const has_more_entries = existing.length === entries_per_page && page * entries_per_page !== total_count;
        const to = has_more_entries ? page + 1 : null;
        const total_pages = Math.ceil(total_count / entries_per_page);

        return {
          data: existing,
          pagination: {
            current_page: page,
            from,
            to,
            per_page: entries_per_page,
            total: total_count,
            total_pages,
          },
        };
      }

      return null;
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
