import type { AlignContent, ButtonType, ColumnSpan, InputType, Variant } from "./enums";

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
	formats?: [];
}

export interface Button {
	id: number;
	label: string;
	variant: Variant;
	type: ButtonType;
}

export interface Link {
	id: number;
	label: string;
	url: string;
	variant: Variant;
	is_external: boolean;
}

export interface Seo {
	id: number;
	meta_title: string;
	meta_description: string;
	meta_canonical_url: string;
	prevent_index: boolean;
	meta_image?: Image;
}

export interface Icon {
	icon_name: string;
	is_image: boolean;
	image?: Image;
}

export interface SocialMedia {
	id: number;
	url: string;
	icon?: Icon;
}

export interface Contact {
	id: number;
	email: string;
	phone: string;
	social_medias?: SocialMedia[];
}

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

export interface Heading {
	title: string;
	align_content?: AlignContent;
	has_link: boolean;
	link: Link;
}

export interface Color {
	is_hex: boolean;
	type: Variant;
	is_dark_text: boolean;
	hex: string;
}
