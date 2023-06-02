import _ from "lodash";
import IUser from "../../../models/interfaces/user.interface";
import { accessTokenService } from "../../../services";

/**
 * @description Logout user by destroying their token
 * @function logoutUserController
 */
export async function logoutUserController(httpRequest: { context: { user: IUser } }) {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { _id: user_id, type: user_type }: { _id: string; type: string } = _.get(httpRequest, "context.user");
    const is_logout = await accessTokenService.delete({ user_id, user_type });

    return {
      headers,
      statusCode: 200,
      body: {
        data: is_logout,
      },
    };
  } catch (err: any) {
    throw {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}
