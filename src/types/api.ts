export interface APIResponse<T = any> {
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
