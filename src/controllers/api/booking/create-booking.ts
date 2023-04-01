import _ from "lodash";

import IBooking from "../../../models/interfaces/booking.interface";
import { bookingService } from "../../../services";

/**
 * @description Create new booking record in database
 * @function createBookingController
 */
async function createBookingController(httpRequest: Request & { context: { validated: IBooking } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const bookingDetails: IBooking = _.get(httpRequest, "context.validated");
    const created_booking = await bookingService.insert(bookingDetails);
    if (!created_booking) {
      throw new Error(`Booking was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_booking,
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

export default createBookingController;
