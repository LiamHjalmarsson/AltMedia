import type { ColumnSpan, InputType } from "../enums";
import type { Button } from "./ui";

export interface Input {
	id: number;
	label: string;
	name: string;
	placeholder?: string | null;
	required: boolean;
	type: InputType;
	input_type?: string;
	rows?: number;
	options?: string[];
	column_span: ColumnSpan;
}

export interface Form {
	id: number;
	title: string;
	description?: string | null;
	columns: number;
	inputs: Input[];
	button: Button;
}
