import _ from "lodash";

import { cafeService } from "../../../services";

/**
 * @description Get cafe by ID
 * @function getCafeController
 */
async function getCafeController(httpRequest: Request & { context: { validated: { cafe_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { cafe_id }: { cafe_id: string } = _.get(httpRequest, "context.validated");
    const cafe = await cafeService.findById({ id: cafe_id });
    if (!cafe) {
      throw new Error(`Cafe with ${cafe_id} does not exist.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: cafe,
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

export default getCafeController;
