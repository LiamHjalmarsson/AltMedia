import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { StrapiBlocksContent } from "../blocks";
import type { BlockContentSectionComponent } from "../components/block/contentSection";
import type { BlockIntroductionComponent } from "../components/block/introduction";
import type { SeoComponent } from "../components/seo/seo";
import type { UiDividerComponent } from "../components/ui/divider";
import type { Media } from "../media";
import type { Service } from "./service";

export type RelatedService = Pick<Service, "id" | "title" | "slug">;

export interface Article {
	id: number;
	title: string;
	slug: string;
	description?: string;
	published_date: Date;
	reading_time_min?: number | null;
	display_table_of_contents: boolean;
	table_of_contents_title?: string;
	content: StrapiBlocksContent[];
	cover: Media;
	services?: RelatedService[];
	blocks?: ArticleBlock[];
	seo: SeoComponent | null;
}

export type ArticleBlock = BlockIntroductionComponent | BlockContentSectionComponent | UiDividerComponent;

export type ArticleResponse = Strapi5ResponseSingle<Article>;

export type ArticlesResponse = Strapi5ResponseMany<Article>;
