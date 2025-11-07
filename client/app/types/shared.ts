import type { Subservice } from "./content/collections";
import type { AlignContent, ButtonType, ColumnSpan, InputType, Size, Theme, Variant } from "./enums";

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

export interface Icon {
	id: number;
	icon_name?: string | null;
	is_image: boolean;
	image?: Image | null;
}

export interface Link {
	id?: number;
	label: string;
	url: string;
	variant: Variant;
	is_external?: boolean;
	size?: Size;
	icon?: string;
	reversed?: boolean;
}

export interface Button {
	id?: number;
	label: string;
	variant: Variant;
	type: ButtonType;
	size?: Size;
	icon?: string;
	reversed?: boolean;
}

export interface Heading {
	id?: number;
	title: string;
	description?: string;
	align_content: AlignContent;
	has_link?: boolean;
	link?: Link | null;
}

export interface Color {
	type: Variant;
	hex?: string;
	theme: Theme;
}

export interface Seo {
	id: number;
	meta_title: string;
	meta_description?: string;
	meta_canonical_url?: string | null;
	prevent_index?: boolean;
	meta_image?: {
		id: number;
		url: string;
	};
}

export interface Introduction {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	subservices: Subservice[];
}

export interface Input {
	id: number;
	label: string;
	name: string;
	placeholder?: string | null;
	required: boolean;
	type: InputType;
	input_type?: string;
	rows?: number;
	options?: {};
	column_span: ColumnSpan;
}

export interface Form {
	id: number;
	title: string;
	description?: string | null;
	columns: number;
	inputs: Input[];
	button: Button;
}

export interface MetaPage {
	id: string;
	title: string;
	description?: string;
	align_content?: "left" | "center" | "right";
	seo?: Seo;
}
