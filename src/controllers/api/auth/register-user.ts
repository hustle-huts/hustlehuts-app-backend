import _ from "lodash";
import { hashPassword } from "../../../configs/bcrypt";
import { omit } from "../../../utils/omit";

import IUser, { UserType } from "../../../models/interfaces/user.interface";
import { userService } from "../../../services";

/**
 * @description Create new user record in database
 * @function registerUserController
 */
export async function registerUserController(httpRequest: Request & { context: { validated: IUser } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const user_details: Omit<IUser, "_id"> & { password?: string } = _.get(httpRequest, "context.validated");
    const user_exist = await userService.findByEmail({ email: user_details.email });
    if (user_exist) {
      throw Error("User already existed. Please login instead.");
    }

    const hash_password = await hashPassword(user_details.password);
    Object.assign(user_details, {
      hash_password,
      type: UserType.CUSTOMER, // Temporary only allow user to register as customer
    });

    const created_user = await userService.insert(user_details);
    if (!created_user) {
      throw new Error(`User was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: omit(created_user, ["hash_password"]),
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
