import type { Blocks } from "../blocks/enums";
import type { Hero } from "../blocks/hero";

export interface HomePage {
	id: number;
	documentId: string;
	hero: Hero;

	blocks: Blocks[];
}
