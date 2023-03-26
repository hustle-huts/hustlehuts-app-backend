import _ from "lodash";
import { cafeService } from "../../../services";

/**
 * @description Get cafes paginated
 * @function getCafesPaginatedController
 */
async function getCafesPaginatedController(
  httpRequest: Request & {
    context: {
      validated: {
        name?: string;
        address?: string;
        credit?: string;
        query?: string;
        page: string;
        entries_per_page?: string;
        sort_by?: string;
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
      page = "1",
      entries_per_page = "10",
      sort_by,
    }: {
      name?: string;
      address?: string;
      credit?: string;
      query?: string;
      page: string;
      entries_per_page?: string;
      sort_by?: string;
    } = _.get(httpRequest, "context.validated");

    const cafes = await cafeService.findAllPaginated(
      {
        name,
        address,
        credit: credit ? Number(credit) : undefined,
        sort_by,
      },
      {
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      },
    );

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

export default getCafesPaginatedController;
