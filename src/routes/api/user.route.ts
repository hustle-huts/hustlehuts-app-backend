import express from "express";
import makeExpressCallback from "../../express-callback";
import { getUserController, updateUserController, getUserByEmailController } from "../../controllers/api/user";

import authenticateUserMiddleware from "../../middlewares/authenticate-user.middlware";

const userRouter = express.Router();

/**
 * @openapi
 * /api/user/email/{email}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Get user details by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user to retrieve
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: The user details were fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/UserResponse'
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
 *     tags:
 *     - /api/user
 */
userRouter.get("/email/:email", authenticateUserMiddleware, makeExpressCallback(getUserByEmailController));

/**
 * @openapi
 * /api/user/{user_id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Get user details by email
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The user_id of the user to retrieve
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *     responses:
 *       '200':
 *         description: The user details were fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/UserResponse'
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
 *     tags:
 *     - /api/user
 */
userRouter.get("/:user_id", authenticateUserMiddleware, makeExpressCallback(getUserController));

/**
 * @openapi
 * /api/user:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     description: Update user details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       '200':
 *         description: The user details were updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/UserResponse'
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
 *     tags:
 *     - /api/user
 */
userRouter.put("/", authenticateUserMiddleware, makeExpressCallback(updateUserController));

export default userRouter;
