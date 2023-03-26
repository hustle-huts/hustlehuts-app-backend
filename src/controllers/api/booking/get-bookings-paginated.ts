import _ from "lodash";
import { bookingService } from "../../../services";

/**
 * @description Get bookings paginated
 * @function getBookingsPaginatedController
 */
async function getBookingsPaginatedController(
  httpRequest: Request & {
    context: {
      validated: {
        user_id?: string;
        cafe_id?: string;
        sort_by?: string;
        page: string;
        entries_per_page?: string;
      };
    };
  },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const {
      user_id,
      cafe_id,
      page = "1",
      entries_per_page = "10",
      sort_by,
    }: {
      user_id?: string;
      cafe_id?: string;
      page: string;
      entries_per_page?: string;
      sort_by?: string;
    } = _.get(httpRequest, "context.validated");

    const bookings = await bookingService.findAllPaginated(
      {
        user_id,
        cafe_id,
        sort_by,
      },
      {
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      },
    );

    return {
      headers,
      statusCode: 200,
      body: {
        data: bookings,
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

export default getBookingsPaginatedController;
