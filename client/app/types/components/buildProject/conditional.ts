export interface UiConditionalComponent {
	id: number;
	label: string;
	trigger_value: string;
	placeholder?: string;
	type: "input" | "textarea" | "number" | "url";
}
