/**
 * It takes a cafeDbModel as an argument and returns a class with a bunch of functions that use the
 * cafeDbModel to perform CRUD operations on the database
 * @param  - cafeDbModel: mongoose.Model<ICafe & mongoose.Document>
 * @returns A function that returns a new instance of the class MongooseCafeDb
 */
import _ from "lodash";
import mongoose from "mongoose";

import { ICafeService } from "./interfaces/cafe";
import ICafe, { PaginatedCafeResult } from "../models/interfaces/cafe.interface";

export default function makeCafeService({ cafeDbModel }: { cafeDbModel: mongoose.Model<ICafe & mongoose.Document> }) {
  return new (class MongooseCafeDb implements ICafeService {
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
      const existing = await cafeDbModel.findOne(query_conditions).lean({ virtuals: true });
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
      const existing = await cafeDbModel.findOne(query_conditions).lean({ virtuals: true });
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
      const existing = await cafeDbModel.find(query_conditions).sort({ updated_at: "desc" }).lean({ virtuals: true });
      if (existing) {
        return existing;
      }
      return [];
    }

    /**
     * It returns a paginated list of cafes based on the query parameters passed to it
     * @returns A paginated list of cafes.
     */
    async findAllPaginated(
      {
        name,
        address,
        credit,
        sort_by,
        longitude,
        latitude,
      }: {
        name?: string;
        address?: string;
        credit?: number;
        sort_by?: string;
        longitude?: number;
        latitude?: number;
      },
      { query, page = 1, entries_per_page = 9 }: { query?: string; page: number; entries_per_page?: number },
    ): Promise<PaginatedCafeResult | null> {
      const query_conditions = { deleted_at: undefined };
      const number_of_entries_to_skip = (page - 1) * entries_per_page;

      if (name) {
        query_conditions["name"] = { $regex: name, $options: "i" };
      }

      if (address) {
        query_conditions["address"] = { $regex: address, $options: "i" };
      }

      if (credit) {
        query_conditions["credit"] = credit;
      }

      if (longitude && latitude) {
        query_conditions["location"] = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 1000,
          },
        };
      }

      if (query) {
        query_conditions["$or"] = [
          { name: { $regex: ".*" + query + ".*", $options: "si" } },
          { address: { $regex: ".*" + query + ".*", $options: "si" } },
          { open_at: { $regex: ".*" + query + ".*", $options: "si" } },
          { close_at: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
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

      const existing = await cafeDbModel
        .find(query_conditions)
        .skip(number_of_entries_to_skip)
        .limit(entries_per_page)
        .sort(sort_query)
        .lean({ virtuals: true });

      const total_count = await cafeDbModel.countDocuments(query_conditions);

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
     * It takes in a bunch of query parameters, and returns a list of cafes that match the query parameters
     * @param  - `name` - the name of the cafe
     * @returns An array of cafes
     */
    async findAllByQuery({
      name,
      address,
      credit,
      sort_by,
      longitude,
      latitude,
      query,
    }: {
      name?: string;
      address?: string;
      credit?: number;
      sort_by?: string;
      longitude?: number;
      latitude?: number;
      query?: string;
    }): Promise<ICafe[]> {
      const query_conditions = { deleted_at: undefined };
      if (name) {
        query_conditions["name"] = { $regex: name, $options: "i" };
      }

      if (address) {
        query_conditions["address"] = { $regex: address, $options: "i" };
      }

      if (credit) {
        query_conditions["credit"] = credit;
      }

      if (longitude && latitude) {
        query_conditions["location"] = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 1000,
          },
        };
      }

      if (query) {
        query_conditions["$or"] = [
          { name: { $regex: ".*" + query + ".*", $options: "si" } },
          { address: { $regex: ".*" + query + ".*", $options: "si" } },
          { open_at: { $regex: ".*" + query + ".*", $options: "si" } },
          { close_at: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
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

      const existing = await cafeDbModel.find(query_conditions).sort(sort_query).lean({ virtuals: true });
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
      const updated = await cafeDbModel.findById({ _id: payload._id }).lean({ virtuals: true });
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
      const existing = await cafeDbModel
        .findOneAndUpdate({ _id: id }, { deleted_at: new Date() })
        .lean({ virtuals: true });
      if (existing) {
        return existing;
      }
      return null;
    }
  })();
}
