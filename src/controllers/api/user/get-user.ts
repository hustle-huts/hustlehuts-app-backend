import _ from "lodash";
import { omit } from "../../../utils/omit";

import { userService } from "../../../services";

/**
 * @description Get user by ID
 * @function getUserController
 */
async function getUserController(httpRequest: Request & { context: { validated: { user_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { user_id }: { user_id: string } = _.get(httpRequest, "context.validated");
    const user = await userService.findById({ id: user_id });
    if (!user) {
      throw new Error(`User with ${user_id} does not exist.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: omit(user, ["password_hash"]),
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        message: `Unable to get information on user with id ${httpRequest.context.validated.user_id}`,
        errors: err.message,
      },
    };
  }
}

export default getUserController;
