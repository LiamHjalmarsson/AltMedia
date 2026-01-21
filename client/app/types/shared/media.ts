export interface ImageFormat {
	url: string;
	name: string;
	width: number;
	height: number;
	size: number;
	path?: string | null;
}

export interface Image {
	id: number;
	formats?: {
		thumbnail?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		large?: ImageFormat;
	};
	name: string;
	width: number;
	height: number;
	url: string;
	provider?: string;
	alternativeText?: string;
	caption?: string;
	mime?: string;
}
