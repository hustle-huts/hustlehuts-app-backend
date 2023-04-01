import _ from "lodash";
import IUser, { UserType } from "../../../models/interfaces/user.interface";
import { userService } from "../../../services";
import { hashPassword } from "../../../configs/bcrypt";

/**
 * @description Create new user record in database
 * @function createUserController
 */
async function createUserController(httpRequest: Request & { context: { validated: IUser } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const userDetails: Omit<IUser, "_id"> & { password?: string } = _.get(httpRequest, "context.validated");
    const user_exist = await userService.findByEmail({
      email: userDetails.email,
      type: userDetails.type as UserType,
    });

    if (user_exist) {
      throw Error("User already existed. Please login instead.");
    }

    const hash_password = await hashPassword(userDetails.password);
    Object.assign(userDetails, { hash_password, type: UserType.CUSTOMER });

    const created_user = await userService.insert(userDetails);
    if (!created_user) {
      throw new Error("User was not created.");
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_user,
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

export default createUserController;
