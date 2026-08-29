export interface PaginationOptions {
  page?: number | string;
  limit?: number | string;
  maxLimit?: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
  currentPage: number;
  limit: number;
}

export function calculatePagination(
  options: PaginationOptions,
): PaginationResult {
  const page = Math.max(1, parseInt(String(options.page || 1), 10));
  const defaultLimit = 10;
  const maxLimit = options.maxLimit || 100;

  const limit = Math.min(
    maxLimit,
    Math.max(1, parseInt(String(options.limit || defaultLimit), 10)),
  );

  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
    currentPage: page,
    limit,
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}
