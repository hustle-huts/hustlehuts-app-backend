import _ from "lodash";
import { omit } from "../../../utils/omit";
import IUser from "../../../models/interfaces/user.interface";

/**
 * @description Auth user by the access token. Returns the user object.
 * @function authUserController
 */
export async function authUserController(httpRequest: Request & { context: { user: IUser } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const user_exists = _.get(httpRequest, "context.user");
    if (!user_exists) {
      throw new Error(`User does not exist`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: omit(user_exists, ["hash_password"]),
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        error: err.message,
      },
    };
  }
}
