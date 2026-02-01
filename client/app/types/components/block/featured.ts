import type { Service } from "~/types/collectionTypes/service";
import type { UiHeadingComponent } from "../ui/heading";
import type { FeaturedType } from "~/types/enums";
import type { Project } from "~/types/collectionTypes/project";
import type { Article } from "~/types/collectionTypes/article";

export interface BlockFeaturedComponent {
	__component: "block.featured";
	id: number;
	heading: UiHeadingComponent;
	features: FeaturedType;
	services?: Service[];
	projects?: Project[];
	articles?: Article[];
}
