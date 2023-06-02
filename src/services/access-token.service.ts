import mongoose from "mongoose";
import IAccessToken from "../models/interfaces/access-token.interface";

export default function makeAccessTokenDb({
  accessTokenDbModel,
}: {
  accessTokenDbModel: mongoose.Model<IAccessToken & mongoose.Document>;
}) {
  return new (class MongooseAccessTokenDb {
    /**
     * It returns a list of all the access tokens in the database
     * @returns An array of access tokens.
     */
    async findAll(): Promise<IAccessToken[]> {
      const existing = await accessTokenDbModel.find().lean({ virtuals: true });
      if (existing) {
        return existing.map((accessToken) => ({
          token: accessToken.token,
        }));
      }
      return existing;
    }

    /**
     * "Finds an access token by user id, user type, and whether or not it's deleted."
     *
     * The function is async, so it returns a promise. The promise resolves to an object that implements
     * the IAccessToken interface
     * @param  - `user_id` - the user id of the user who is requesting the access token
     * @returns An object with the token and deleted properties.
     */
    async findOne({ user_id, user_type }: { user_id: string; user_type?: string }): Promise<IAccessToken | null> {
      const existing = await accessTokenDbModel.findOne({ user_id, user_type }).lean({ virtuals: true });
      if (existing) {
        return { token: existing.token };
      }
      return existing;
    }

    /**
     * "Find the user_id associated with the given token, if it exists and is not deleted."
     *
     * The function is async, so it returns a Promise. The Promise resolves to a string or undefined
     * @param  - `token`: The access token to find the user ID for.
     * @returns The user_id of the user who is logged in.
     */
    async findUserId({ token }: { token: string }): Promise<string | undefined> {
      const existing = await accessTokenDbModel.findOne({ token }).lean({ virtuals: true });
      if (existing) {
        return existing.user_id;
      }
      return undefined;
    }

    /**
     * "Find a valid access token for the given user id and type."
     *
     * The function is async, so it returns a promise. The promise resolves to a string, which is the
     * access token, or null if no valid token is found
     * @param  - `user_id` - the user id of the user you want to find a token for
     * @returns The token is being returned.
     */
    async findValidToken({ user_id, user_type }: { user_id: string; user_type?: string }): Promise<string | null> {
      const existing = await accessTokenDbModel.findOne({ user_id, user_type }).lean({ virtuals: true });
      if (existing) {
        return existing.token;
      }
      return null;
    }

    /**
     * It inserts a new access token into the database.
     * @param payload - This is the payload that you want to insert into the database.
     * @returns The result of the insert operation.
     */
    async insert(payload: Partial<IAccessToken>): Promise<IAccessToken | null> {
      const result = await accessTokenDbModel.create([payload]);
      const updated = await accessTokenDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return updated;
      }
      return null;
    }

    /**
     * It finds an access token that matches the given token and that is not deleted, and then it deletes
     * it
     * @param  - `token`: The token to delete.
     * @param options - { session: null }
     * @returns The token that was deleted.
     */
    async deleteByToken({ token }: { token: string }, options = { session: null }): Promise<string | null> {
      const result = await accessTokenDbModel
        .findOneAndDelete({ token })
        .session(options.session)
        .lean({ virtuals: true });
      return result && result.token;
    }

    /**
     * It deletes an access token by setting the `deleted` field to `true`
     * @param  - `user_id`: The user id of the user to delete the token for.
     * @param options - {
     * @returns The result of the update operation.
     */
    async delete(
      {
        user_id,
        user_type,
      }: {
        user_id: string;
        user_type?: string;
      },
      options = { session: null },
    ): Promise<boolean | null> {
      const result = await accessTokenDbModel
        .findOneAndDelete({ user_id, user_type })
        .session(options.session)
        .lean({ virtuals: true });
      return !!result && !!result.token;
    }

    /**
     * "This function deletes all access tokens for a given user id."
     *
     * The function takes two parameters:
     *
     * 1. `user_id`: The user id of the user whose access tokens we want to delete.
     * 2. `options`: An object that contains the MongoDB session object
     * @param  - `user_id`: The user id of the user whose access tokens are to be deleted.
     * @param options - {
     * @returns The return value is a boolean value.
     */
    async deleteAllByUserId({ user_id }: { user_id: string }, options = { session: null }): Promise<boolean> {
      const query_conditions = { user_id };
      const updated = await accessTokenDbModel
        .deleteMany(query_conditions)
        .session(options.session)
        .lean({ virtuals: true });
      return updated.acknowledged;
    }
  })();
}
