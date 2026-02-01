export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
}

export interface PaginationMeta {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface ErrorResponse {
	data: null;
	error: {
		status: number;
		name: string;
		message: string;
		details: Record<string, unknown>;
	};
}

export type QueryParams = Record<string, string | number | boolean>;
