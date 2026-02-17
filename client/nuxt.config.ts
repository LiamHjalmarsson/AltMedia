import tailwindcss from "@tailwindcss/vite";
import type { NuxtPage } from "@nuxt/schema";

type RoutePathPrefixRewriteRule = {
	fromPathPrefix: string;
	toPathPrefix: string;
};

const ROUTE_PATH_PREFIX_REWRITE_RULES: RoutePathPrefixRewriteRule[] = [
	{ fromPathPrefix: "/contact-us", toPathPrefix: "/kontakta-oss" },
	{ fromPathPrefix: "/start-a-project", toPathPrefix: "/starta-projekt" },
	{ fromPathPrefix: "/about", toPathPrefix: "/om-oss" },
	{ fromPathPrefix: "/services", toPathPrefix: "/tjanster" },
	{ fromPathPrefix: "/projects", toPathPrefix: "/projekt" },
	{ fromPathPrefix: "/blog", toPathPrefix: "/blogg" },
];

function traverseNuxtPagesDepthFirst(nuxtPages: NuxtPage[], handleNuxtPage: (nuxtPage: NuxtPage) => void): void {
	for (const nuxtPage of nuxtPages) {
		handleNuxtPage(nuxtPage);

		const childPages = nuxtPage.children;

		if (childPages?.length) {
			traverseNuxtPagesDepthFirst(childPages, handleNuxtPage);
		}
	}
}

function rewriteRoutePathByPrefixRules(routePath: string, prefixRewriteRules: RoutePathPrefixRewriteRule[]): string {
	for (const prefixRewriteRule of prefixRewriteRules) {
		const { fromPathPrefix, toPathPrefix } = prefixRewriteRule;

		if (routePath === fromPathPrefix) {
			return toPathPrefix;
		}

		const fromPathPrefixWithTrailingSlash = `${fromPathPrefix}/`;

		if (routePath.startsWith(fromPathPrefixWithTrailingSlash)) {
			const routePathWithoutPrefix = routePath.slice(fromPathPrefix.length);

			return `${toPathPrefix}${routePathWithoutPrefix}`;
		}
	}

	return routePath;
}

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",

	devtools: { enabled: true },

	modules: [
		"@nuxt/fonts",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/eslint",
		"@nuxtjs/strapi",
		"@pinia/nuxt",
		"v-gsap-nuxt",
		"nuxt-strapi-blocks-renderer",
	],

	css: ["~/assets/css/main.css"],

	runtimeConfig: {
		public: {
			strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
			strapiToken: process.env.NUXT_PUBLIC_STRAPI_TOKEN ?? "",
		},
	},

	hooks: {
		"pages:extend"(scannedNuxtPages) {
			traverseNuxtPagesDepthFirst(scannedNuxtPages, (nuxtPage) => {
				const currentRoutePath = nuxtPage.path;

				if (!currentRoutePath) return;

				const rewrittenRoutePath = rewriteRoutePathByPrefixRules(
					currentRoutePath,
					ROUTE_PATH_PREFIX_REWRITE_RULES,
				);

				if (rewrittenRoutePath !== currentRoutePath) {
					nuxtPage.path = rewrittenRoutePath;
				}
			});
		},
	},

	fonts: {
		provider: "google",
		defaults: {
			subsets: ["latin"],
			weights: [400, 600],
			styles: ["normal"],
		},
		families: [
			{
				name: "Quicksand",
				provider: "google",
				global: true,
			},
			{
				name: "Montserrat",
				provider: "google",
				global: true,
			},
		],
	},

	vite: {
		plugins: [tailwindcss()],

		build: {
			cssMinify: true,
			chunkSizeWarningLimit: 1000,
		},
	},

	typescript: {
		typeCheck: true,
	},

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
		{
			path: "~/components/blocks/strapiContentBlocks",
			pathPrefix: false,
			global: true,
		},
	],
});
