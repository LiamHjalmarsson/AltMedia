import type { ButtonType, Variant } from "./enums";

export interface Image {
	id: number;
	documentId: string;
	name: string;
	width: number;
	height: number;
	url: string;
	provider: string;
	alternativeText: string;
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
	meta_cannical_url: string;
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
