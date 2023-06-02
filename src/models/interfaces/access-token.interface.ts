import { UserType } from "./user.interface";

export enum AccessTokenType {
  LOGIN = "login",
}

export default interface IAccessToken {
  token: string;
  type?: AccessTokenType;
  user_id?: string;
  user_type?: UserType;
  created_at?: Date;
  updated_at?: Date;
}
