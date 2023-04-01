import _ from "lodash";
import passport_google from "passport-google-oauth20";
import { Logger } from "winston";
import { PassportStatic } from "passport";
import { userService } from "../../services";
import { UserType, UserLoginProvider } from "../../models/interfaces/user.interface";

interface InitializeGoogleData {
  passport: PassportStatic;
  logger: Logger;
}

export default function initializeGoogle({ passport, logger }: InitializeGoogleData): PassportStatic {
  const GoogleStrategy = passport_google.Strategy;
  const opts: passport_google.StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
  };

  passport.serializeUser((user, done) => {
    done(undefined, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(undefined, user);
  });

  const able_to_initialize_google = opts.clientID && opts.clientSecret;
  if (able_to_initialize_google) {
    passport.use(
      "google",
      new GoogleStrategy(opts, async (accessToken, refreshToken, profile, done) => {
        try {
          const email = _.get(profile, "emails[0].value") as string;
          logger.verbose(`User's google profile object for user`, { email, profile });
          const user = await userService.findByEmail({ email, type: UserType.CUSTOMER });
          if (!user) {
            const user_payload = {
              first_name: _.get(profile, "name.givenName", email) as string,
              last_name: _.get(profile, "name.familyName") as string,
              email,
              provider: UserLoginProvider.GOOGLE,
              provider_meta: profile,
              type: UserType.CUSTOMER,
            };
            const new_user = await userService.insert(user_payload);
            return done(null, new_user);
          }
          return done(null, user);
        } catch (err) {
          logger.error(`Encountered error with google authentication.`, err);
          return done(err);
        }
      }),
    );
  }
  return passport;
}
