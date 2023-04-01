import password_jwt from "passport-jwt";
import { PassportStatic } from "passport";
import { userService, accessTokenService } from "../../services";

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
      const exist = await userService.findByEmail({ email: jwt_payload.email, type: jwt_payload.user_type });
      if (!exist) {
        return done(undefined, undefined);
      }

      const valid = await accessTokenService.findOne({
        user_id: exist._id,
        user_type: "user",
        revoked: false,
      });

      if (!valid) {
        return done(undefined, undefined);
      }

      Object.assign(exist, { token_type: jwt_payload.type });
      return done(undefined, exist);
    }),
  );

  return passport;
}
