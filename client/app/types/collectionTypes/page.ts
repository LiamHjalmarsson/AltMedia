import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Blocks } from "../components/block/block";
import type { SeoComponent } from "../components/seo/seo";

export interface Page {
	id: number;
	title: string;
	slug: string;
	blocks?: Blocks[];
	seo?: SeoComponent | null;
}

export type PageResponse = Strapi5ResponseSingle<Page>;
