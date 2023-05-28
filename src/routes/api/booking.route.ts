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
import authenticateUserMiddleware from "../../middlewares/authenticate-user.middlware";

const bookingRouter = express.Router();
/**
 * @openapi
 *    $ref: "../../configs/swagger/schemas/booking.yaml"
 */

/**
 * @openapi
 * /api/booking:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     description: Book slots from a particular cafe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       '200':
 *         description: The booking was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Booking'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *       '404':
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *       '422':
 *         description: Validation error on the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *     tags:
 *     - /api/booking
 */
bookingRouter.post(
  "/",
  makeValidator(createBookingRules),
  authenticateUserMiddleware,
  makeExpressCallback(createBookingController),
);

/**
 * @openapi
 * /api/booking:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Retrieve all bookings made by user (paginated)
 *     parameters:
 *        - name: page
 *          description: which page do you want to fetch
 *          in: query
 *          required: false
 *          type: integer
 *        - name: entries_per_page
 *          description: number of entries do you want to fetch each query
 *          in: query
 *          required: false
 *          type: integer
 *        - name: query
 *          description: the search query
 *          in: query
 *          required: false
 *          type: string
 *        - name: cafe_id
 *          description: cafe id to filter
 *          in: query
 *          required: false
 *          type: string
 *        - name: sort_by
 *          description: the sort condition
 *          in: query
 *          required: false
 *          type: string
 *     responses:
 *       '200':
 *         description: The booking details.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/BookingPaginatedResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *       '404':
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *       '422':
 *         description: Validation error on the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *     tags:
 *     - /api/booking
 */
bookingRouter.get(
  "/",
  makeValidator(getBookingsPaginatedRules),
  authenticateUserMiddleware,
  makeExpressCallback(getBookingsPaginatedController),
);

/**
 * @openapi
 * /api/booking/user:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Retrieve all bookings made by user (non-paginated)
 *     responses:
 *       '200':
 *         description: The booking details.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/BookingResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *       '404':
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *       '422':
 *         description: Validation error on the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *     tags:
 *     - /api/booking
 */
bookingRouter.get("/user", authenticateUserMiddleware, makeExpressCallback(getBookingsByUserController));

/**
 * @openapi
 * /api/booking/{booking_id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Get booking by id
 *     parameters:
 *       - name: booking_id
 *         description: booking id
 *         in: path
 *         required: true
 *         type: string
 *         pattern: "^[0-9a-fA-F]{24}$"
 *     responses:
 *       '200':
 *         description: The booking details.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/BookingResponse'
 *       '404':
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: The error message.
 *     tags:
 *     - /api/booking
 */
bookingRouter.get(
  "/:booking_id",
  makeValidator(getBookingRules),
  authenticateUserMiddleware,
  makeExpressCallback(getBookingController),
);

export default bookingRouter;
