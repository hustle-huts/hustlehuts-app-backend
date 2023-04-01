import _ from "lodash";
import { UserType } from "../../../models/interfaces/user.interface";
import { accessTokenService } from "../../../services";

/**
 * @description Logout user by destroying their token
 * @function logoutUserController
 */
async function logoutUserController(httpRequest: { context: { validated: { user_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { user_id }: { user_id: string } = _.get(httpRequest, "context.validated");
    const is_logout = await accessTokenService.revoke({ user_id, user_type: UserType.CUSTOMER });

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

export default logoutUserController;
