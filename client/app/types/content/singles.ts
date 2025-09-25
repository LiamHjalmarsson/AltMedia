import type { Button, Image, Seo, Link, Icon, Form } from "../shared";
import type { Blocks, Cta, Hero } from "./blocks";

export interface GlobalConfig {
	id: number;
	documentId: string;
	site_name: string;
	favicon: Image;
	navigation: Navigation;
	footer: Footer;
	seo?: Seo;
	contact?: ContactDetails;
}

export interface HomePage {
	id: number;
	documentId: string;
	hero: Hero;

	blocks: Blocks[];
}

export interface MenuLink {
	id: number;
	label: string;
	url: string;
	aria_label?: string;
}

export interface Navigation {
	id: number;
	logo?: Image;
	links: MenuLink[];
	aria_label?: string;
}

export interface SocialMedia {
	id: number;
	url: string;
	icon: Icon;
}

export interface ContactDetails {
	id: number;
	email?: string;
	phone?: string;
	social_medias?: SocialMedia[];
}

export interface Contact {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	form?: Form;
	seo?: Seo;
}

export interface FooterColumn {
	id: number;
	title: string;
	url?: string;
	links: MenuLink[];
}

export interface Footer {
	id: number;
	cta?: Cta;
	footer_columns?: FooterColumn[];
}
