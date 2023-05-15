import express from "express";
import makeExpressCallback from "../../express-callback";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  loginUserByProviderController,
} from "../../controllers/api/auth";

import authenticateUserJWT from "../../middlewares/authenticate-user.middlware";
import passport from "passport";
import makeExpressViewCallback from "../../express-callback/express-view-callback";

const authRouter = express.Router();

/**
 * @openapi
 * /api/auth/google:
 *   get:
 *     description: Authenticate google user
 *     responses:
 *       200:
 *         description: Authenticated successfully.
 *     tags:
 *     - /api/auth
 */
authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.organization.read",
      "https://www.googleapis.com/auth/user.phonenumbers.read",
    ],
  }),
);

/**
 * @openapi
 * /api/auth/google/callback:
 *   get:
 *     description: Google callback route
 *     responses:
 *       200:
 *         description: Successful callback.
 *     tags:
 *     - /api/auth
 */
authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  makeExpressViewCallback(loginUserByProviderController),
);

/**
 * @openapi
 * /api/auth/facebook:
 *   get:
 *     description: Authenticate facebook user
 *     responses:
 *       200:
 *         description: Authenticated successfully.
 *     tags:
 *     - /api/auth
 */
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
  }),
);

/**
 * @openapi
 * /api/auth/facebook/callback:
 *   get:
 *     description: Google callback route
 *     responses:
 *       200:
 *         description: Successful callback.
 *     tags:
 *     - /api/auth
 */
authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  makeExpressViewCallback(loginUserByProviderController),
);

/**
 * @openapi
 * /api/auth/:
 *   post:
 *     description: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: First name of the user.
 *               last_name:
 *                 type: string
 *                 description: Last name of the user.
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user, unhashed.
 *               telegram_handle:
 *                 type: string
 *                 description: Telegram handle of the user.
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Registered successfully.
 *     tags:
 *     - /api/auth
 */
authRouter.post("/", makeExpressCallback(registerUserController));

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user, unhashed.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully.
 *     tags:
 *     - /api/auth
 */
authRouter.post("/login", makeExpressCallback(loginUserController));

authRouter.post("/logout", authenticateUserJWT(), makeExpressCallback(logoutUserController));

export default authRouter;
