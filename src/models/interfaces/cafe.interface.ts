import IUser from "./user.interface";

export default interface ICafe {
  _id: string;
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  open_at: string[]; // List of opening times for each day
  close_at: string[]; // List of closing times for each day
  credit: number;
  has_wifi: boolean;
  has_charging: boolean;
  has_ambience: boolean;
  image_url: string;
  availability_time_slots: {
    date: string;
    time: string[];
    seat: number[];
  }[];
  manager?: IUser;
  rating?: number;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface PaginatedCafeResult {
  data: ICafe[];
  pagination: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
