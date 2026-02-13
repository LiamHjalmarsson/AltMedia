export function buildServicesPath(): string {
	return "/tjanster";
}

export function buildServicePath(serviceSlug: string): string {
	return `/tjanster/${serviceSlug}`;
}

export function buildSubservicePath(serviceSlug: string, subserviceSlug: string) {
	return `/tjanster/${serviceSlug}/${subserviceSlug}`;
}

export function buildBlogPath(): string {
	return "/blogg";
}

export function buildBlogPostPath(postSlug: string): string {
	return `/blogg/${postSlug}`;
}

export function buildProjectsPath(): string {
	return "/projekt";
}

export function buildProjectPath(projectSlug: string): string {
	return `/projekt/${projectSlug}`;
}
