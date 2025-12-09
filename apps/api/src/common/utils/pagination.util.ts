export interface PaginationOptions {
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class PaginationUtil {
  static normalize(options: PaginationOptions): { skip: number; take: number } {
    const page = options.page || 1;
    const limit = options.limit || options.take || 50;
    const skip = options.skip !== undefined ? options.skip : (page - 1) * limit;

    return {
      skip: Math.max(0, skip),
      take: Math.min(100, Math.max(1, limit)), // Max 100 items per page
    };
  }

  static createResult<T>(
    data: T[],
    total: number,
    options: PaginationOptions,
  ): PaginationResult<T> {
    const page = options.page || 1;
    const limit = options.limit || options.take || 50;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}

