import tailwindcss from "@tailwindcss/vite";
import type { NuxtPage } from "@nuxt/schema";

type PathRewriteRule = {
	sourcePrefix: string;
	targetPrefix: string;
};

function forEachNuxtPage(pages: NuxtPage[], handlePage: (page: NuxtPage) => void): void {
	for (const currentPage of pages) {
		handlePage(currentPage);

		if (currentPage.children?.length) forEachNuxtPage(currentPage.children, handlePage);
	}
}

function rewritePagePath(originalPath: string, rewriteRules: PathRewriteRule[]): string {
	for (const rule of rewriteRules) {
		if (originalPath === rule.sourcePrefix) return rule.targetPrefix;

		const sourcePrefixWithSlash = `${rule.sourcePrefix}/`;

		if (originalPath.startsWith(sourcePrefixWithSlash)) {
			return originalPath.replace(rule.sourcePrefix, rule.targetPrefix);
		}
	}

	return originalPath;
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

	// nitro: {
	// 	preset: "static",
	// 	prerender: {
	// 		crawlLinks: true,

	// 		routes: ["/", "/__prerender"],
	// 	},
	// },

	runtimeConfig: {
		public: {
			strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
			strapiToken: process.env.NUXT_PUBLIC_STRAPI_TOKEN ?? "",
		},
	},

	hooks: {
		"pages:extend"(scannedPages) {
			const rewriteRules: PathRewriteRule[] = [
				{ sourcePrefix: "/contact-us", targetPrefix: "/kontakta-oss" },
				{ sourcePrefix: "/start-a-project", targetPrefix: "/starta-projekt" },
				{ sourcePrefix: "/about", targetPrefix: "/om-oss" },

				{ sourcePrefix: "/services", targetPrefix: "/tjanster" },
				{ sourcePrefix: "/projects", targetPrefix: "/projekt" },
				{ sourcePrefix: "/blog", targetPrefix: "/blogg" },
			];

			forEachNuxtPage(scannedPages, (page) => {
				if (!page.path) return;

				page.path = rewritePagePath(page.path, rewriteRules);
			});
		},
	},

	// app: {
	// 	head: {
	// 		link: [
	// 			{
	// 				rel: "preconnect",
	// 				href: process.env.STRAPI_URL || "http://localhost:1337",
	// 				crossorigin: "",
	// 			},
	// 			{
	// 				rel: "dns-prefetch",
	// 				href: process.env.STRAPI_URL || "http://localhost:1337",
	// 			},
	// 		],
	// 	},
	// },

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
