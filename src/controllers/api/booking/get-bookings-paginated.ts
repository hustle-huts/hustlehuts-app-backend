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
        cafe_id?: string;
        sort_by?: string;
        page: string;
        entries_per_page?: string;
      };
      user: {
        _id: string;
      };
    };
  },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const {
      cafe_id,
      page = "1",
      entries_per_page = "10",
      sort_by,
    }: {
      cafe_id?: string;
      page: string;
      entries_per_page?: string;
      sort_by?: string;
    } = _.get(httpRequest, "context.validated");
    const { _id: user_id }: { _id: string } = _.get(httpRequest, "context.user");

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
      body: bookings,
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
