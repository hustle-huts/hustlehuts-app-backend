import _ from "lodash";
import { omit } from "../../../utils/omit";

import { userService } from "../../../services";

/**
 * @description Get user by email
 * @function getUserByEmailController
 */
async function getUserByEmailController(httpRequest: Request & { context: { validated: { email: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { email }: { email: string } = _.get(httpRequest, "context.validated");
    const user = await userService.findByEmail({ email });

    if (!user) {
      throw new Error(`User with ${email} does not exist.`);
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
        errors: err.message,
      },
    };
  }
}

export default getUserByEmailController;
