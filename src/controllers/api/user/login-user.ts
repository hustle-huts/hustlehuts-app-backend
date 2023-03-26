import _ from "lodash";
import { verifyPassword } from "../../../configs/bcrypt";
import { generateJWTToken } from "../../../configs/jwt";
import { logger } from "../../../configs/logs";
import { omit } from "../../../utils/omit";

import { userService, accessTokenService } from "../../../services";

/**
 * @description Check user's email and password and return login message if successful
 * @function loginUserController
 */
async function loginUserController(
  httpRequest: Request & { context: { validated: { email: string; password: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { email, password }: { email: string; password: string } = _.get(httpRequest, "context.validated");
    const user_exists = await userService.findByEmail({ email });

    if (!user_exists) {
      throw new Error(`User does not exist`);
    }

    const is_valid_password = await verifyPassword({
      password,
      hash_password: user_exists.password_hash,
    });

    if (!is_valid_password) {
      throw new Error(`Incorrect password`);
    }

    let login_token = await accessTokenService.findValidToken({
      user_id: user_exists._id,
      user_type: user_exists.type,
    });

    if (!login_token) {
      logger.verbose(`User has no valid token, creating one now...`);
      login_token = generateJWTToken({ user_id: user_exists._id, user_type: user_exists.type }, { expiresIn: "1y" });
      await accessTokenService.insert({
        user_id: user_exists._id,
        user_type: user_exists.type,
        token: login_token,
      });
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: omit(user_exists, ["password_hash"]),
        login_token,
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

export default loginUserController;
