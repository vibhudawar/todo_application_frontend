export interface APIResponse<T = unknown> {
 success: boolean;
 message: string;
 data?: T;
 error?: string;
}

export interface PaginationParams {
 skip?: number;
 limit?: number;
}

export interface PaginatedResponse<T> {
 items: T[];
 total: number;
 skip: number;
 limit: number;
}
