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
				{
					rel: "preconnect",
					href: process.env.NUXT_PUBLIC_STRAPI_URL,
					crossorigin: "",
				},
			],
		},
	},

	fonts: {
		provider: "google",
		defaults: {
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
			cssCodeSplit: true,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ["vue", "pinia", "vue-router"],
					},
				},
			},
		},
		esbuild: {
			drop: ["console", "debugger"],
		},
	},

	typescript: {
		typeCheck: true,
		strict: true,
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

	routeRules: {
		"/**": {
			prerender: true,
			headers: {
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		},
	},

	router: {
		options: {},
	},
});
