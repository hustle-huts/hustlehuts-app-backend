import IUser from "./user.interface";

export default interface ICafe {
  _id: string;
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  opening_hours: {
    monday: { open_at: string; close_at: string };
    tuesday: { open_at: string; close_at: string };
    wednesday: { open_at: string; close_at: string };
    thursday: { open_at: string; close_at: string };
    friday: { open_at: string; close_at: string };
    saturday: { open_at: string; close_at: string };
    sunday: { open_at: string; close_at: string };
  };
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
