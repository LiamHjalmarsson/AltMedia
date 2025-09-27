import type { Block } from "typescript";
import type { Subservice } from "./content/collections";
import type { AlignContent, ButtonType, ColumnSpan, InputType, Size, Variant } from "./enums";

export interface BaseEntity {
	id: number;
	documentId: string;
}

export interface ImageFormat {
	url: string;
	name: string;
	width: number;
	height: number;
	size: number;
	path?: string | null;
}

export interface Image extends BaseEntity {
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
}

export interface Icon {
	id: number;
	icon_name?: string | null;
	is_image: boolean;
	image?: Image | null;
}

export interface Link {
	id: number;
	label: string;
	url: string;
	variant: Variant;
	is_external: boolean;
	size?: Size;
	icon?: Icon;
	icon_is_position_right?: boolean;
	aria_label?: string;
}

export interface Heading {
	id: number;
	title: string;
	align_content: AlignContent;
	has_link?: boolean;
	link?: Link | null;
}

export interface Card {
	id: number;
	title: string;
	content: Block[];
	icon: Icon;
}

export interface Button {
	id: number;
	label: string;
	variant: Variant;
	type: ButtonType;
	size?: Size;
	icon?: Icon;
	icon_is_position_right?: boolean;
	aria_label?: string;
}

export interface Color {
	is_hex: boolean;
	type?: Variant;
	hex?: string;
	is_dark_text: boolean;
}

export interface Seo {
	id: number;
	meta_title: string;
	meta_description: string;
	meta_canonical_url?: string | null;
	prevent_index: boolean;
	meta_image: {
		id: number;
		documentId: string;
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
	options?: {};
	rows?: number;
	column_span: ColumnSpan;
}

export interface Form {
	id: number;
	title: string;
	description?: string | null;
	inputs: Input[];
	columns: number;
	button: Button;
}
