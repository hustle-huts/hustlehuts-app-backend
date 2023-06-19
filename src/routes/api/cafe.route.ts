import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator.middleware";
import { getCafeRules, getCafesPaginatedRules, getCafesByQueryRules } from "../../controllers/api/cafe/validator";
import { getCafeController, getCafesPaginatedController, getCafesByQueryController } from "../../controllers/api/cafe";

const cafeRouter = express.Router();
/**
 * @openapi
 *    $ref: "../../configs/swagger/schemas/cafe.yaml"
 */

/**
 * @openapi
 * /api/cafe:
 *   get:
 *     summary: Get cafes paginated
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the cafe to search for.
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Address of the cafe to search for.
 *       - in: query
 *         name: credit
 *         schema:
 *           type: string
 *         description: Amount of credit the cafe has.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Query to search for cafes.
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           format: int
 *         description: The page number to return.
 *       - in: query
 *         name: entries_per_page
 *         schema:
 *           type: string
 *           format: int
 *         description: The number of entries to return per page.
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *         description: The field to sort the cafes by.
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: string
 *         description: The longitude of the location to search for cafes.
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: string
 *         description: The latitude of the location to search for cafes.
 *     responses:
 *       '200':
 *         description: A list of cafes.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CafePaginatedResponse'
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
 *      - /api/cafe
 */
cafeRouter.get("/", makeValidator(getCafesPaginatedRules), makeExpressCallback(getCafesPaginatedController));

/**
 * @openapi
 * /api/cafe/query:
 *   get:
 *     summary: Get cafes by query (non-paginated)
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the cafe to search for.
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Address of the cafe to search for.
 *       - in: query
 *         name: credit
 *         schema:
 *           type: string
 *         description: Amount of credit the cafe has.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Query to search for cafes.
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *         description: The field to sort the cafes by.
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: string
 *         description: The longitude of the location to search for cafes.
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: string
 *         description: The latitude of the location to search for cafes.
 *     responses:
 *       '200':
 *         description: A list of cafes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CafeResponse'
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
 *      - /api/cafe
 */
cafeRouter.get("/query", makeValidator(getCafesByQueryRules), makeExpressCallback(getCafesByQueryController));

/**
 * @openapi
 * /api/cafe/{cafe_id}:
 *   get:
 *     summary: Get a cafe by ID
 *     parameters:
 *       - in: path
 *         name: cafe_id
 *         required: true
 *         description: ID of the cafe to retrieve
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *     responses:
 *       '200':
 *         description: The cafe details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CafeResponse'
 *       '404':
 *         description: Cafe not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
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
 *      - /api/cafe
 */
cafeRouter.get("/:cafe_id", makeValidator(getCafeRules), makeExpressCallback(getCafeController));

export default cafeRouter;
