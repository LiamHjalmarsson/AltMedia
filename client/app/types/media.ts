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

export type ImageFormats = Partial<MediaFormats>;
export interface Media {
	id: number;

	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number | null;
	height: number | null;

	formats: ImageFormats | null;

	hash: string;
	ext: string | null;
	mime: string;
	size: number;

	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: Record<string, unknown> | null;
}
