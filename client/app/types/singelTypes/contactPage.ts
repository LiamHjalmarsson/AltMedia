import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { UiFormComponent } from "../components/form/form";
import type { SeoComponent } from "../components/seo/seo";
import type { StylesColorComponent } from "../components/styles/color";
import type { Media } from "../media";

export interface ContactPage {
	id: string;
	title: string;
	description: string;
	color: StylesColorComponent;
	cover: Media;
	form: UiFormComponent;
	seo?: SeoComponent;
}

export type ContactPageResponse = Strapi5ResponseSingle<ContactPage>;
