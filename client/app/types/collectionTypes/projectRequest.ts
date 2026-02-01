export type ProjectRequestData = unknown;

export interface ProjectRequest {
	name: string;
	email: string;
	phone: string | null;
	data: ProjectRequestData | null;
}
