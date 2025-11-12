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

	router: {
		options: {},
	},
});

