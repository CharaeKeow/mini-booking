export type ApiErrorResponse = { message: string };
export type ApiSuccessResponse<T> = { data: T };

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;
