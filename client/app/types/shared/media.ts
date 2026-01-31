export interface ImageFormat {
	url: string;
	name: string;
	width: number;
	height: number;
	size: number;
	path?: string | null;
}

export type ImageFormatKey = "thumbnail" | "small" | "medium" | "large";

export type ImageFormats = Partial<Record<ImageFormatKey, ImageFormat>>;

export interface Image {
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
