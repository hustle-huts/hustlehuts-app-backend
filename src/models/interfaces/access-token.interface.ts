export default interface IAccessToken {
  token: string;
  revoked: boolean;
  user_id?: string;
  user_type?: string;
  created_at?: Date;
  updated_at?: Date;
}
