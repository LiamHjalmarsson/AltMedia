import type { ColumnSpan } from "~/types/enums";

/**
 * Converts a ColumnSpan string and total columns into a numeric span for CSS grid.
 * @param span ColumnSpan ("full" | "half" | "two-thirds" | "one-third")
 * @param total Total number of columns in the grid
 * @returns Number of columns to span
 */
export function getGridSpan(span: ColumnSpan | undefined, total: number): number {
	if (!span) {
		return total;
	}

	switch (span) {
		case "full":
			return total;
		case "half":
			return Math.ceil(total / 2);
		case "two-thirds":
			return Math.ceil((total * 2) / 3);
		case "one-third":
			return Math.ceil(total / 3);
		default:
			return total;
	}
}
