import passport from "passport";
import { logger } from "../logs";
import initializeJWT from "./jwt";
import initializeGoogle from "./google";
import initializeFacebook from "./facebook";

const secretOrKey = process.env.AUTH_SECRET || "auth_secret";

initializeJWT(passport, secretOrKey);
initializeGoogle({ passport, logger });
initializeFacebook({ passport, logger });

export default passport;
