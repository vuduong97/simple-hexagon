export interface IPagination {
  current_page: number; // Số trang hiện tại
  items_per_page: number; // Số lượng record tối đa trên 1 trang
  item_count: number; // Số lượng record thực tế hiện có trên trang
  total_items: number; // Tổng số lượng record toàn bộ trang
  total_pages: number; // Tổng số page
}

export interface IBackendResponsePagination<T> {
  meta: IPagination;
  items: T[];
}

export interface IFindAllResponse<T> {
  count: number;
  items: T[];
}
