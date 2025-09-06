import type { Button, Contact, Image, Seo, Link } from "../shared";
import type { Blocks, Hero } from "./blocks";

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

export interface FooterCta {
	title: string;
	description: string;
	buttons?: Button[];
	links?: Link[];
}

export interface Footer {
	id: number;
	cta?: FooterCta;
	footer_columns?: FooterColumn[];
}
