import createBookingController from "./create-booking";
import getBookingController from "./get-booking";
import getBookingsByUserController from "./get-bookings-by-user";
import getBookingsPaginatedController from "./get-bookings-paginated";

const cafeController = Object.freeze({
  createBookingController,
  getBookingController,
  getBookingsByUserController,
  getBookingsPaginatedController,
});

export default cafeController;

export { createBookingController, getBookingController, getBookingsByUserController, getBookingsPaginatedController };
