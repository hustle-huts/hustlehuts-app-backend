import _ from "lodash";
import FacebookStrategy, { Profile } from "passport-facebook";
import { Logger } from "winston";
import { PassportStatic } from "passport";
import { userService } from "../../services";
import { UserType, UserLoginProvider } from "../../models/interfaces/user.interface";

interface InitializeFacebookData {
  passport: PassportStatic;
  logger: Logger;
}

export default function initializeFacebook({ passport, logger }: InitializeFacebookData): PassportStatic {
  const opts = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BASE_URL}/api/auth/facebook/callback`,
    profileFields: ["id", "email", "name"],
  };

  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  const able_to_initialize_facebook = opts.clientID && opts.clientSecret;
  if (able_to_initialize_facebook) {
    passport.use(
      "facebook",
      new FacebookStrategy(opts, async (accessToken: string, refreshToken: string, profile: Profile, done) => {
        try {
          const email = _.get(profile, "emails[0].value") as string;
          logger.verbose(`User's facebook profile object for user`, { email, profile });
          const exists = userService.findByEmail({ email });
          if (!exists) {
            logger.info(`User of social email ${email} or user's email ${_.get(exists, "email")} does not exist.`);
            const user_payload = {
              first_name: _.get(profile, "name.givenName", email) as string,
              last_name: _.get(profile, "name.familyName") as string,
              email,
              provider: UserLoginProvider.FACEBOOK,
              provider_meta: profile,
              type: UserType.CUSTOMER,
            };

            const new_user = await userService.insert(user_payload);
            return done(null, new_user);
          }
          return done(null, exists);
        } catch (err) {
          logger.error(`Encountered error with facebook authentication.`, err);
        }
      }),
    );
    logger.verbose("Initialized passport for facebook.");
  }
  return passport;
}
