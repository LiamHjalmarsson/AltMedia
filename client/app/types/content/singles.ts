import type { Image, Seo, Icon, Form, BaseEntity } from "../shared";
import type { Blocks, Cta, Hero } from "./blocks";

export interface GlobalConfig extends BaseEntity {
	site_name: string;
	favicon: {
		id: number;
		documentId: string;
		url: string;
	};
	navigation: Navigation;
	footer: Footer;
	seo?: Seo;
	contact?: ContactDetails;
}

export interface HomePage extends BaseEntity {
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
	aria_label?: string;
	logo?: Image;
	links: MenuLink[];
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

export interface ContactPage extends BaseEntity {
	form: Form;
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
