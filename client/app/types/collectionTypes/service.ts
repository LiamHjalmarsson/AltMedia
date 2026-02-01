import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { StrapiBlocksContent } from "../blocks";
import type { SeoComponent } from "../components/seo/seo";
import type { UiIconComponent } from "../components/ui/icon";
import type { Media } from "../media";
import type { Article } from "./article";
import type { Subservice } from "./subservice";

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: StrapiBlocksContent;
	icon: UiIconComponent;
	image: Media;
	subservices: Pick<Subservice, "id" | "title" | "slug" | "content" | "icon" | "has_page" | "description">[];
	articles?: Pick<Article, "id" | "title" | "slug">[];
	order?: number;
	seo?: SeoComponent | null;
}

export type ServiceResponse = Strapi5ResponseSingle<Service>;

export type ServicesResponse = Strapi5ResponseMany<Service>;
