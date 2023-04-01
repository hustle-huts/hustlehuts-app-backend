import _ from "lodash";

import ICafe from "../../../models/interfaces/cafe.interface";
import { cafeService } from "../../../services";

/**
 * @description Update existing cafe record in database
 * @function updateCafeController
 */
async function updateCafeController(
  httpRequest: Request & { context: { validated: Partial<ICafe> & { password: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const cafeDetails: Partial<ICafe> = _.get(httpRequest, "context.validated");
    const updated_cafe = await cafeService.update(cafeDetails);
    if (!updated_cafe) {
      throw new Error(`Cafe was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: updated_cafe,
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

export default updateCafeController;
