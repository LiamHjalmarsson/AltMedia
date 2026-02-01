import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BlockCtaComponent } from "../components/block/cta";
import type { BlockFaqComponent } from "../components/block/faq";
import type { BlockFeaturedComponent } from "../components/block/featured";
import type { BlockFullSectionComponent } from "../components/block/fullSection";
import type { BlockHeroComponent } from "../components/block/hero";
import type { BlockListComponent } from "../components/block/list";
import type { UiFormComponent } from "../components/form/form";

export type HomePageBlock =
	| ({
			__component: "block.list";
			id: number;
	  } & BlockListComponent)
	| ({
			__component: "block.full-section";
			id: number;
	  } & BlockFullSectionComponent)
	| ({
			__component: "block.faq";
			id: number;
	  } & BlockFaqComponent)
	| ({
			__component: "block.featured";
			id: number;
	  } & BlockFeaturedComponent)
	| ({
			__component: "block.cta";
			id: number;
	  } & BlockCtaComponent);

export interface HomePage {
	id: number;
	hero: BlockHeroComponent;
	has_form: boolean;
	form?: UiFormComponent;
	blocks: HomePageBlock[];
}

export type HomePageResponse = Strapi5ResponseSingle<HomePage>;
