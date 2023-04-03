import _ from "lodash";
import { cafeService } from "../../../services";

/**
 * @description Get cafes by query
 * @function getCafesByQueryController
 */
async function getCafesByQueryController(
  httpRequest: Request & {
    context: {
      validated: {
        name?: string;
        address?: string;
        credit?: string;
        sort_by?: string;
        longitude?: string;
        latitude?: string;
        query?: string;
      };
    };
  },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const {
      name,
      address,
      credit,
      query,
      sort_by,
      longitude,
      latitude,
    }: {
      name?: string;
      address?: string;
      credit?: string;
      query?: string;
      sort_by?: string;
      longitude?: string;
      latitude?: string;
    } = _.get(httpRequest, "context.validated");

    const cafes = await cafeService.findAllByQuery({
      name,
      address,
      credit: credit ? Number(credit) : undefined,
      query,
      sort_by,
      longitude: longitude ? Number(longitude) : undefined,
      latitude: latitude ? Number(latitude) : undefined,
    });

    return {
      headers,
      statusCode: 200,
      body: {
        data: cafes,
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

export default getCafesByQueryController;
