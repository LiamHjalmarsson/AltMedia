import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { StrapiBlocksContent } from "../blocks";
import type { Blocks } from "../components/block/block";
import type { BlockHeroComponent } from "../components/block/hero";
import type { BlockIntroductionComponent } from "../components/block/introduction";
import type { SeoComponent } from "../components/seo/seo";
import type { UiIconComponent } from "../components/ui/icon";
import type { Service } from "./service";
import type { Tag } from "./tag";

export interface Subservice {
	id: string;
	title: string;
	slug: string;
	price_once?: number | null;
	description: string;
	has_page: boolean;
	content: StrapiBlocksContent;
	service?: Service;
	icon: UiIconComponent;
	tags?: Tag[];
	hero?: BlockHeroComponent;
	introduction?: BlockIntroductionComponent;
	blocks?: Blocks[];
	seo?: SeoComponent | null;
}

export type SubServiceResponse = Strapi5ResponseSingle<Subservice>;

export type SubServicesResponse = Strapi5ResponseMany<Subservice>;
