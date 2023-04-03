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

authRouter.post("/", makeExpressCallback(registerUserController));

authRouter.post("/login", makeExpressCallback(loginUserController));

authRouter.post("/logout", authenticateUserJWT(), makeExpressCallback(logoutUserController));

export default authRouter;
