import ICafe from "./cafe";
import IUser from "./user";

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
