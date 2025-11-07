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
			link: [{ rel: "preconnect", href: "https://stable-benefit-bde0905312.strapiapp.com", crossorigin: "" }],
		},
	},

	runtimeConfig: {
		strapi: {
			url: process.env.STRAPI_URL || "http://localhost:1337",
			token: process.env.STRAPI_TOKEN || undefined,
		},
		public: {
			strapi: {
				url: "http://localhost:1337",
			},
		},
	},

	// nitro: {
	// 	compressPublicAssets: true,
	// 	routeRules: {
	// 		"/**": {
	// 			headers: {
	// 				"Cache-Control": "public, max-age=36000, immutable",
	// 					"default-src 'self'; img-src * data: blob:; media-src * data: blob:; font-src * data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
	// 				"Cross-Origin-Opener-Policy": "same-origin",
	// 				"X-Frame-Options": "DENY",
	// 				"Referrer-Policy": "strict-origin-when-cross-origin",
	// 				"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
	// 			},
	// 		},
	// 	},
	// },

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
