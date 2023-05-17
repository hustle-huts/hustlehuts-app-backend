import _ from "lodash";
import { bookingService } from "../../../services";

/**
 * @description Get bookings
 * @function getBookingsByUserController
 */
async function getBookingsByUserController(
  httpRequest: Request & {
    context: {
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
    const { _id: user_id }: { _id: string } = _.get(httpRequest, "context.user");
    const bookings = await bookingService.findAllByUser({ user_id });

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

export default getBookingsByUserController;
