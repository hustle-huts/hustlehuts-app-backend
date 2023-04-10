import _ from "lodash";
import { cafeService, bookingService } from "../../../services";

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

    // get bookings from the given cafe_id
    const bookings = await bookingService.findAllByCafe({ cafe_id });
    const bookedSlots = new Set();

    // for each booking, add the date:time to a set bookedSlots
    bookings.forEach((booking) => {
      booking.slots.forEach((slot) => {
        const slotKey = `${slot.date}:${slot.time.join(":")}`;
        bookedSlots.add(slotKey);
      });
    });

    // Filter out fully booked slots
    const availableSlots = cafe.availability_time_slots.map((slot) => {
      const availableSeats: (number | never)[] = [];
      slot.seat.forEach((seat, index) => {
        if (seat > 0 && !bookedSlots.has(`${slot.date}:${slot.time[index]}`)) {
          availableSeats.push(seat);
        }
      });
      if (availableSeats.length > 0) {
        return { date: slot.date, time: slot.time, seat: availableSeats };
      }
      return null;
    }).filter(Boolean);

    return {
      headers,
      statusCode: 200,
      body: {
        data: {
          ...cafe,
          availability_time_slots: availableSlots,
        },
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

