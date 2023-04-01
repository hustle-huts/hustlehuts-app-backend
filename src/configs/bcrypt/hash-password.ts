import bcrypt from "bcryptjs";

export default async function hashPassword(password?: string): Promise<string> {
  if (!password) {
    throw new Error("Password is required.");
  }
  const salt_rounds = 10;
  const hashed_password = await bcrypt.hash(password, salt_rounds);
  return hashed_password;
}
