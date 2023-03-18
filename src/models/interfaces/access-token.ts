export default interface IAccessToken {
  token: string;
  revoked: boolean;
  user_id?: string;
  user_role?: string;
  created_at?: Date;
  updated_at?: Date;
}
