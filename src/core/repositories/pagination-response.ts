export interface PaginationResponse<T> {
  data: T
  total: number
  totalPages?: number
  page?: number
  limit?: number
}
