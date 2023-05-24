import { hashPassword } from "../configs/bcrypt";
import IUser, { UserLoginProvider, UserType } from "../models/interfaces/user.interface";
import { userService } from "../services";

export async function createDefaultUser() {
  const password = await hashPassword("password");
  const user: Partial<IUser> = {
    email: "user@hustlehuts.com",
    first_name: "Hustle",
    last_name: "Huts",
    hash_password: password,
    type: UserType.CUSTOMER,
    provider: UserLoginProvider.EMAIL,
  };

  await userService.insert(user);
}
