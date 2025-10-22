import tailwindcss from "@tailwindcss/vite";

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

	app: {
		head: {
			link: [
				{ rel: "preconnect", href: "https://stable-benefit-bde0905312.strapiapp.com" },
				{ rel: "dns-prefetch", href: "https://stable-benefit-bde0905312.strapiapp.com" },
			],
		},
	},

	nitro: { compressPublicAssets: true },

	fonts: {
		provider: "google",
		defaults: {
			weights: [400, 600],
			styles: ["normal"],
			subsets: ["latin", "latin-ext"],
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

		build: { cssCodeSplit: true, rollupOptions: { treeshake: true } },
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

	router: {
		options: {},
	},
});
