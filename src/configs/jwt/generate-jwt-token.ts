import jwt from "jsonwebtoken";
import { UserType } from "../../models/interfaces/user.interface";

const secret = process.env.JWT_SECRET || "AUTH_SECRET";
const cafe_secret = process.env.JWT_CAFE_SECRET || "CAFE_AUTH_SECRET";

export default function generateJWTToken(
  payload: { user_id: string; user_type: UserType },
  options: { expiresIn: string },
) {
  let secret_to_use = secret;
  if (payload.user_type === UserType.CAFE) {
    secret_to_use = cafe_secret;
  }
  const token = jwt.sign(payload, secret_to_use, options);
  return token;
}
