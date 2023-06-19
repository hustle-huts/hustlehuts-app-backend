import IUser from "../../models/interfaces/user.interface";

export interface IUserService {
  insert(payload: Partial<IUser>): Promise<IUser | null>;
  findById(params: { id: string }): Promise<IUser | null>;
  findByEmail(params: { email: string; type?: string }): Promise<IUser | null>;
  findByEmailExists(params: { email: string }): Promise<boolean>;
  findAll(): Promise<IUser[]>;
  findAllByUserIds(params: { user_ids: string[] }): Promise<IUser[]>;
  update(payload: Partial<IUser>): Promise<IUser | null>;
  hardDelete(params: { id: string }): Promise<boolean>;
  delete(params: { id: string }): Promise<IUser | null>;
}
