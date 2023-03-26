import IUser from "./user";

export default interface ICafe {
  _id: string;
  name: string;
  address: string;
  open_at: string;
  close_at: string;
  availability_time_slots: {
    date: string;
    time: string[];
    timezone: string;
    seat: number;
  }[];
  manager: IUser;
  credit: number;
  image_url: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
