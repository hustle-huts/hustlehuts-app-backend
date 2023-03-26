import ICafe, { PaginatedCafeResult } from "../../models/interfaces/cafe";

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
    }: {
      name?: string;
      address?: string;
      credit?: number;
      sort_by?: string;
    },
    { query, page = 1, entries_per_page = 9 }: { query?: string; page: number; entries_per_page?: number },
  ): Promise<PaginatedCafeResult | null>;
  update(payload: Partial<ICafe>): Promise<ICafe | null>;
  hardDelete({ id }: { id: string }): Promise<boolean>;
  delete({ id }: { id: string }): Promise<ICafe | null>;
}
