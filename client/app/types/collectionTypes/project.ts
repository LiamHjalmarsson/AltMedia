import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Blocks } from "../components/block/block";
import type { BlockHeroComponent } from "../components/block/hero";
import type { BlockIntroductionComponent } from "../components/block/introduction";
import type { SeoComponent } from "../components/seo/seo";
import type { Media } from "../media";
import type { Service } from "./service";

export type RelatedService = Pick<Service, "id" | "title" | "slug">;

export interface Project {
	id: string;
	title: string;
	slug: string;
	client?: string;
	date?: Date;
	cover: Media;
	services: [];
	hero?: BlockHeroComponent;
	introduction?: BlockIntroductionComponent;
	blocks?: Blocks[];
	seo: SeoComponent | null;
}

export type ProjectResponse = Strapi5ResponseSingle<Project>;

export type ProjectsResponse = Strapi5ResponseMany<Project>;
