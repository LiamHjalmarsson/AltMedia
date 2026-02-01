import type { UiInputComponent } from "../form/input";
import type { UiConditionalComponent } from "./conditional";
import type { UiOptionComponent } from "./option";

export interface UiQuestionComponent {
	id: number;
	title: string;
	help_text?: string;
	required?: boolean;
	type: "boolean" | "single" | "input";
	options?: UiOptionComponent[];
	conditional?: UiConditionalComponent;
	input?: UiInputComponent;
	order: number;
}
