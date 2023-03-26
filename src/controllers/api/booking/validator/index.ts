import createBookingRules from "./create-booking";
import getBookingsPaginatedRules from "./get-bookings-paginated";
import getBookingRules from "./get-booking";

export default Object.freeze({
  getBookingRules,
  createBookingRules,
  getBookingsPaginatedRules,
});

export { getBookingRules, createBookingRules, getBookingsPaginatedRules };
