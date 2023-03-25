import _ from "lodash";

import { userService } from "../../../services";

/**
 * @description Delete existing user record in database by ID
 * @function deleteUserController
 */
async function deleteUserController(httpRequest: Request & { context: { validated: { user_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { user_id }: { user_id: string } = _.get(httpRequest, "context.validated");
    const deleted_user = await userService.delete({ id: user_id });
    if (!deleted_user) {
      throw new Error(`User by ${user_id} is unable to delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: deleted_user,
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

export default deleteUserController;
