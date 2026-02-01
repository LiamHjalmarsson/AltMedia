import type { BlockCtaComponent } from "./cta";
import type { BlockFaqComponent } from "./faq";
import type { BlockFeaturedComponent } from "./featured";
import type { BlockFullSectionComponent } from "./fullSection";
import type { BlockHeroComponent } from "./hero";
import type { BlockInfoComponent } from "./info";
import type { BlockListComponent } from "./list";
import type { BlockStorySplitComponent } from "./storySplit";

export type Blocks =
	| BlockHeroComponent
	| BlockCtaComponent
	| BlockFullSectionComponent
	| BlockInfoComponent
	| BlockListComponent
	| BlockFaqComponent
	| BlockFeaturedComponent
	| BlockStorySplitComponent;
