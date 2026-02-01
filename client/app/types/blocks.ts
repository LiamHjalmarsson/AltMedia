import type { BlockNode } from "#strapi-blocks-renderer/types";

export type StrapiBlocksContent = BlockNode[];

export interface Strapi5Error {
	error: {
		status: number;
		name: string;
		message: string;
		details: Record<string, unknown>;
	};
}
