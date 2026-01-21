import type { AlignContent, ButtonType, Htag, Size, Variant } from "../enums";
import type { Image } from "./media";

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
	size: Size;
	icon?: string;
	reversed?: boolean;
}

export interface Button {
	id?: number;
	label: string;
	variant: Variant;
	type: ButtonType;
	size: Size;
	icon?: string;
	reversed?: boolean;
}

export interface Heading {
	id?: number;
	title: string;
	description?: string;
	align_content: AlignContent;
	has_link?: boolean;
	link?: Link;
	tag?: Htag;
}
