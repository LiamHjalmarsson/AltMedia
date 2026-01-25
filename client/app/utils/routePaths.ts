export function buildServicesListPath(): string {
	return "/tjanster";
}

export function buildServiceDetailsPath(serviceSlug: string): string {
	return `/tjanster/${serviceSlug}`;
}

export function buildSubservicePath(serviceSlug: string, subserviceSlug: string) {
	return `/tjanster/${serviceSlug}/${subserviceSlug}`;
}

export function buildBlogListPath(): string {
	return "/blogg";
}

export function buildBlogPostPath(postSlug: string): string {
	return `/blogg/${postSlug}`;
}

export function buildProjectsListPath(): string {
	return "/projekt";
}

export function buildProjectDetailsPath(projectSlug: string): string {
	return `/projekt/${projectSlug}`;
}
