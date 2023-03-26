import _ from "lodash";

import ICafe from "../../../models/interfaces/cafe";
import { cafeService } from "../../../services";

/**
 * @description Create new cafe record in database
 * @function createCafeController
 */
async function createCafeController(httpRequest: Request & { context: { validated: ICafe } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const cafeDetails: ICafe = _.get(httpRequest, "context.validated");
    const created_cafe = await cafeService.insert(cafeDetails);
    if (!created_cafe) {
      throw new Error(`Cafe was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_cafe,
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

export default createCafeController;
