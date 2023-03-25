import bcrypt from "bcryptjs";

export default async function hashPassword({ password }: { password: string }): Promise<string> {
  const salt_rounds = 10;
  const hashed_password = await bcrypt.hash(password, salt_rounds);
  return hashed_password;
}
