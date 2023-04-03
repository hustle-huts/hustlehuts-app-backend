import ICafe, { PaginatedCafeResult } from "../../models/interfaces/cafe.interface";

export interface ICafeService {
  insert(payload: Partial<ICafe>): Promise<ICafe | null>;
  findById({ id }: { id: string }): Promise<ICafe | null>;
  findByManager({ user_id }: { user_id: string }): Promise<ICafe | null>;
  findAll(): Promise<ICafe[]>;
  findAllPaginated(
    {
      name,
      address,
      credit,
      sort_by,
      longitude,
      latitude,
    }: {
      name?: string;
      address?: string;
      credit?: number;
      sort_by?: string;
      longitude?: number;
      latitude?: number;
    },
    { query, page = 1, entries_per_page = 9 }: { query?: string; page: number; entries_per_page?: number },
  ): Promise<PaginatedCafeResult | null>;
  findAllByQuery({
    name,
    address,
    credit,
    sort_by,
    longitude,
    latitude,
    query,
  }: {
    name?: string;
    address?: string;
    credit?: number;
    sort_by?: string;
    longitude?: number;
    latitude?: number;
    query?: string;
  }): Promise<ICafe[] | null>;
  update(payload: Partial<ICafe>): Promise<ICafe | null>;
  hardDelete({ id }: { id: string }): Promise<boolean>;
  delete({ id }: { id: string }): Promise<ICafe | null>;
}
