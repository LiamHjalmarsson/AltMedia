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

export type QueryParams = Record<string, string | number | boolean>;
