import type { Image, Seo, Icon, Form } from "../shared";
import type { Blocks, Cta, Hero } from "./blocks";

export interface GlobalConfig {
	id: number;
	site_name: string;
	favicon: {
		id: number;
		url: string;
	};
	navigation: Navigation;
	footer: Footer;
	contact?: ContactDetails;
	seo: Seo;
}

export interface HomePage {
	id: number;
	hero: Hero;
	has_form: boolean;
	form?: Form;
	blocks: Blocks[];
}

export interface Navigation {
	id: number;
	aria_label?: string;
	logo?: Image;
	links: MenuLink[];
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

export interface MenuLink {
	id: number;
	label: string;
	url: string;
	aria_label?: string;
}

export interface ContactDetails {
	id: number;
	email?: string;
	phone?: string;
	social_medias?: SocialMedia[];
}

export interface SocialMedia {
	id: number;
	url: string;
	icon: Icon;
}

export interface ContactPage {
	id: string;
	form: Form;
	seo?: Seo;
}
