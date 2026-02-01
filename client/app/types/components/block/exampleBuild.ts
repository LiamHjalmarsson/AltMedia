import type { UiIconComponent } from "../ui/icon";
import type { UiHeadingComponent } from "../ui/heading";
import type { UiLinkComponent } from "../ui/link";
import type { Subservice } from "~/types/collectionTypes/subservice";

export interface BuildItemComponent {
	id: number;
	title: string;
	description?: string;
	price: number;
	icon?: UiIconComponent;
	subservices: Subservice[];
}

export interface BlockExamplesBuildComponent {
	__component: "block.examples-build";
	id: number;
	heading: UiHeadingComponent;
	button: UiLinkComponent;
	items: BuildItemComponent[];
}
