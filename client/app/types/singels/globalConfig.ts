import type { FooterCta } from "../blocks/cta";
import type { Contact, Image, Seo } from "../shared";

export interface MenuLink {
	id: number;
	label: string;
	url: string;
}

export interface Navigation {
	id: number;
	logo?: Image;
	links: MenuLink[];
}

export interface FooterColumn {
	id: number;
	title: string;
	url: string;
	links: MenuLink[];
}

export interface Footer {
	id: number;
	cta?: FooterCta;
	footer_columns?: FooterColumn[];
}

export interface GlobalConfig {
	id: number;
	documentId: string;
	site_name: string;
	favicon: Image;
	navigation: Navigation;
	footer: Footer;
	seo?: Seo;
	contact?: Contact;
}
