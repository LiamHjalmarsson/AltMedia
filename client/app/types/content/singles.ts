import type { Image, Seo, Icon, Form } from "../shared";
import type { Blocks, Cta, Hero } from "./blocks";
import type { Service, Subservice } from "./collections";

// 🔹 Global konfiguration och sidor
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

// 🔹 Startsida
export interface HomePage {
	id: number;
	hero: Hero;
	has_form: boolean;
	form?: Form;
	blocks: Blocks[];
}

// 🔹 Kontakt-sida
export interface ContactPage {
	id: string;
	form: Form;
	seo?: Seo;
}

// 🔹 Byggprojekt-sida
export interface BuildProjectPage {
	id: number;
	title: string;
	description?: string;
	slug?: string;
	steps: {
		id: number;
		title: string;
		description?: string;
		questions: {
			id: number;
			label: string;
			type: "boolean" | "multi" | "text" | "budget" | "time" | "static" | "input";
			options?: string[] | null;
		}[];
		related_services?: { id: number; title: string }[];
		related_subservices?: { id: number; title: string }[];
	}[];
}

export interface Step {
	id: number;
	title: string;
	description?: string | null;
	questions: Question[];
	related_services?: Pick<Service, "id" | "title" | "slug">[];
	related_subservices?: Pick<Subservice, "id" | "title" | "slug">[];
}

export interface Question {
	id: number;
	label: string;
	type: "boolean" | "multi" | "text" | "budget" | "time" | "static" | "input";
	options?: string[];
}
