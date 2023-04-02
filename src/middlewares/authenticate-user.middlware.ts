import passport from "../configs/passport";

export default function authenticateUserJWT() {
  return passport.authenticate("user-jwt", { session: false });
}
