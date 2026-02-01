export interface MediaFormat {
	url: string;
	name: string;
	hash: string;
	mime: string;
	width: number;
	height: number;
	size: number;
	path: string;
}

export type MediaFormats = Partial<Record<"thumbnail" | "small" | "medium" | "large", MediaFormat>>;

export interface Media {
	id: number;
	formats: MediaFormats | null;
	name: string;
	width: number;
	height: number;
	url: string;
	provider?: string;
	alternativeText?: string;
	caption?: string;
	mime?: string;
}
