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

import tokenValidatorMiddleware from "../../middlewares/token-validator.middleware";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  makeValidator(createBookingRules),
  tokenValidatorMiddleware,
  makeExpressCallback(createBookingController),
);
bookingRouter.get(
  "/",
  makeValidator(getBookingsPaginatedRules),
  tokenValidatorMiddleware,
  makeExpressCallback(getBookingsPaginatedController),
);
bookingRouter.get("/user", tokenValidatorMiddleware, makeExpressCallback(getBookingsByUserController));
bookingRouter.get(
  "/:booking_id",
  makeValidator(getBookingRules),
  tokenValidatorMiddleware,
  makeExpressCallback(getBookingController),
);

export default bookingRouter;
