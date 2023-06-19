import { ClientSession } from "mongoose";
import IAccessToken from "../../models/interfaces/access-token.interface";

export interface IAccessTokenService {
  findAll(): Promise<IAccessToken[]>;
  findOne(params: { user_id: string; user_type?: string }): Promise<IAccessToken | null>;
  findUserId(params: { token: string }): Promise<string | undefined>;
  findValidToken(params: { user_id: string; user_type?: string }): Promise<string | null>;
  insert(payload: Partial<IAccessToken>): Promise<IAccessToken | null>;
  deleteByToken(params: { token: string }, options?: { session: ClientSession | null }): Promise<string | null>;
  delete(
    params: { user_id: string; user_type?: string },
    options?: { session: ClientSession | null },
  ): Promise<boolean | null>;
  deleteAllByUserId(params: { user_id: string }, options?: { session: ClientSession | null }): Promise<boolean>;
}
