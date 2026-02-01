import type { Service } from "~/types/collectionTypes/service";
import type { UiQuestionComponent } from "./question";
import type { Subservice } from "~/types/collectionTypes/subservice";

export interface UiStepComponent {
	id: number;
	title: string;
	subtitle?: string;
	description?: string;
	type: "form" | "relations";
	clickable_relations?: boolean;
	services?: Pick<Service, "id" | "title">[];
	subservices?: Pick<Subservice, "id" | "title">[];
	questions: UiQuestionComponent[];
	order: number;
}
