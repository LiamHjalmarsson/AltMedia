import type { UiButtonComponent } from "../ui/button";
import type { UiInputComponent } from "./input";

export interface UiFormComponent {
	id: number;
	title: string;
	description?: string | null;
	columns: number;
	inputs: UiInputComponent[];
	button: UiButtonComponent;
}
