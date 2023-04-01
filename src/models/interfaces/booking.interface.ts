import ICafe from "./cafe.interface";
import IUser from "./user.interface";

export default interface IBooking {
  _id: string;
  user: IUser;
  cafe: ICafe;
  slots: {
    date: string;
    time: string[];
    timezone: string;
    seat: number;
  }[];
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface PaginatedBookingResult {
  data: IBooking[];
  pagination: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
