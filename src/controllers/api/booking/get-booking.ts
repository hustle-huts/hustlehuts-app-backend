import _ from "lodash";

import { bookingService } from "../../../services";

/**
 * @description Get booking by ID
 * @function getBookingController
 */
async function getBookingController(httpRequest: Request & { context: { validated: { booking_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { booking_id }: { booking_id: string } = _.get(httpRequest, "context.validated");
    const booking = await bookingService.findById({ id: booking_id });
    if (!booking) {
      throw new Error(`Booking with ${booking_id} does not exist.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: booking,
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

export default getBookingController;
