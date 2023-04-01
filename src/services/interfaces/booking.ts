import IBooking, { PaginatedBookingResult } from "../../models/interfaces/booking.interface";

export interface IBookingService {
  insert(payload: Partial<IBooking>): Promise<IBooking | null>;
  findById({ id }: { id: string }): Promise<IBooking | null>;
  findAll(): Promise<IBooking[]>;
  findByCafeAndUser({ cafe_id, user_id }: { cafe_id: string; user_id: string }): Promise<IBooking | null>;
  findAllByCafe({ cafe_id }: { cafe_id: string }): Promise<IBooking[]>;
  findAllByUser({ user_id }: { user_id: string }): Promise<IBooking[]>;
  findAllPaginated(
    {
      user_id,
      cafe_id,
      sort_by,
    }: {
      user_id?: string;
      cafe_id?: string;
      sort_by?: string;
    },
    { page = 1, entries_per_page = 9 }: { page: number; entries_per_page?: number },
  ): Promise<PaginatedBookingResult | null>;
  update(payload: Partial<IBooking>): Promise<IBooking | null>;
  hardDelete({ id }: { id: string }): Promise<boolean>;
  delete({ id }: { id: string }): Promise<IBooking | null>;
}
