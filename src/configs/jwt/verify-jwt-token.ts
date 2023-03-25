import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "AUTH_SECRET";

export default function verifyJWTToken({ token }: { token: string }) {
  const is_verified = jwt.verify(token, secret);
  return is_verified;
}
