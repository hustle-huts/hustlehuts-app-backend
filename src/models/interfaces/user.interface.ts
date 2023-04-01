export enum UserType {
  CAFE = "cafe",
  CUSTOMER = "customer",
}

export enum UserLoginProvider {
  EMAIL = "email",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export default interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  type: UserType;
  telegram_handle?: string;
  provider: UserLoginProvider;
  provider_meta?: Record<string, unknown>;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface PaginatedUserResult {
  data: IUser[];
  pagination: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
