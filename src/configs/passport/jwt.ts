import password_jwt from "passport-jwt";
import { PassportStatic } from "passport";
import { userService, accessTokenService } from "../../services";
import { UserType } from "../../models/interfaces/user.interface";

export default function initializeJWT(passport: PassportStatic, secretOrKey: string): PassportStatic {
  const JwtStrategy = password_jwt.Strategy,
    ExtractJwt = password_jwt.ExtractJwt;

  const opts = {
    secretOrKey,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      ExtractJwt.fromUrlQueryParameter("t"),
    ]),
  };

  passport.use(
    "user-jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const user_exists = await userService.findById({ id: jwt_payload.user_id });
      if (!user_exists) {
        return done(undefined, undefined);
      }

      const valid = await accessTokenService.findOne({
        user_id: user_exists._id,
        user_type: UserType.CUSTOMER,
      });

      if (!valid) {
        return done(undefined, undefined);
      }

      return done(undefined, user_exists);
    }),
  );

  return passport;
}
