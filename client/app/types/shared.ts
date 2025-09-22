import type { Block } from "typescript";
import type { Subservice } from "./content/collections";
import type { AlignContent, ButtonType, ColumnSpan, InputType, Size, Variant } from "./enums";

// Image

export interface ImageFormat {
	name: string;
	url: string;
	width: number;
	height: number;
	size: number;
	path?: string | null;
}

export interface Image {
	id: number;
	documentId: string;
	name: string;
	width: number;
	height: number;
	url: string;
	provider?: string;
	alternativeText?: string;
	caption?: string;
	formats?: {
		thumbnail?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		large?: ImageFormat;
	};
}

// UI

export interface Link {
	id: number;
	label: string;
	url: string;
	variant: Variant;
	is_external: boolean;
	size: Size;
	icon: Icon;
	icon_is_position_right: boolean;
	aria_label: string;
}

export interface Icon {
	is_image: boolean;
	icon_name?: string;
	image?: Image;
}

export interface Heading {
	title: string;
	align_content: AlignContent;
	has_link?: boolean;
	link?: Link;
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
	size: Size;
	icon: Icon;
	icon_is_position_right: boolean;
	aria_label: string;
}

//  Styles

export interface Color {
	is_hex: boolean;
	type?: Variant;
	hex?: string;
	is_dark_text: boolean;
}

// Seo

export interface Seo {
	id: number;
	meta_title: string;
	meta_description: string;
	meta_image: Image;
	meta_canonical_url: string;
	prevent_index: boolean;
}

// Sections

export interface Introduction {
	title: string;
	subtitle: string;
	description: string;
	subservices: Subservice[];
}

// Form

export interface Input {
	label: string;
	name: string;
	placeholder: string;
	required: boolean;
	type: InputType;
	options?: {};
	rows?: number;
	input_type?: string;
	column_span: ColumnSpan;
}

export interface Form {
	title: string;
	description: string;
	inputs: Input[];
	columns: number;
	button: Button;
}
