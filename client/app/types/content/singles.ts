import type { Image, Seo, Icon, Form, Color } from "../shared";
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
	logo: Image;
	title: string;
	description: string;
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
	title: string;
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
	title: string;
	description: string;
	color: Color;
	cover: Image;
	form: Form;
	seo?: Seo;
}

// 🔹 Byggprojekt-sida
export interface BuildProjectPage {
	id: number;
	title: string;
	description?: string;
	steps: Step[];
	show_summary_panel: boolean;
	message?: string;
	seo?: Seo;
}

export interface Step {
	id: number;
	title: string;
	subtitle?: string;
	description?: string;
	type: "form" | "relations";
	clickable_relations?: boolean;
	services?: Pick<Service, "id" | "title">[];
	subservices?: Pick<Subservice, "id" | "title">[];
	questions: Question[];
}

export interface Question {
	id: number;
	title: string;
	help_text?: string;
	type: "boolean" | "multi" | "single" | "budget_time" | "textarea" | "input";
	options?: Option[];
	conditional?: Conditional;
}

export interface Option {
	id: number;
	label: string;
	value: string;
	is_static?: boolean;
}

export interface Conditional {
	id: number;
	trigger_value: string;
	placeholder?: string;
	label?: string;
	type?: "input" | "textarea" | "number" | "url";
}
