import type { InputType } from "zlib";
import type { ColumnSpan } from "~/types/enums";

export interface UiInputComponent {
	id: number;
	label: string;
	name: string;
	placeholder?: string | null;
	required: boolean;
	input_type?: string;
	rows?: number;
	options?: string[];
	type: InputType;
	column_span: ColumnSpan;
}
