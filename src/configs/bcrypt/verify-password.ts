import bcrypt from "bcryptjs";

export default async function verifyPassword({ password, hash_password }): Promise<boolean> {
  const is_password_match = await bcrypt.compare(password, hash_password);
  return is_password_match;
}
