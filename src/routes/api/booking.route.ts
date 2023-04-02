import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator.middleware";
import {
  createBookingRules,
  getBookingRules,
  getBookingsPaginatedRules,
} from "../../controllers/api/booking/validator";
import {
  createBookingController,
  getBookingController,
  getBookingsByUserController,
  getBookingsPaginatedController,
} from "../../controllers/api/booking";
import authenticateUserJWT from "../../middlewares/authenticate-user.middlware";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  makeValidator(createBookingRules),
  authenticateUserJWT(),
  makeExpressCallback(createBookingController),
);
bookingRouter.get(
  "/",
  makeValidator(getBookingsPaginatedRules),
  authenticateUserJWT(),
  makeExpressCallback(getBookingsPaginatedController),
);
bookingRouter.get("/user", authenticateUserJWT(), makeExpressCallback(getBookingsByUserController));
bookingRouter.get(
  "/:booking_id",
  makeValidator(getBookingRules),
  authenticateUserJWT(),
  makeExpressCallback(getBookingController),
);

export default bookingRouter;
