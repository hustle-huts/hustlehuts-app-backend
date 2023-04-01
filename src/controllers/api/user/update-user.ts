import _ from "lodash";
import { hashPassword } from "../../../configs/bcrypt";
import { omit } from "../../../utils/omit";

import IUser from "../../../models/interfaces/user.interface";
import { userService } from "../../../services";

/**
 * @description Update existing user record in database
 * @function updateUserController
 */
async function updateUserController(
  httpRequest: Request & { context: { validated: Partial<IUser> & { password: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: Partial<IUser> & { password: string } = _.get(httpRequest, "context.validated");
    // Password is passed in, hash the new password and save into DB
    const new_password = _.get(userDetails, "password");
    if (new_password) {
      const hash_password = await hashPassword(new_password);
      Object.assign(userDetails, { hash_password });
    }

    const updated_user = await userService.update(userDetails);
    if (!updated_user) {
      throw new Error(`User was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: omit(updated_user, ["hash_password"]),
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

export default updateUserController;
