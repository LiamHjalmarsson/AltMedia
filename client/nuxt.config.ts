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

	vite: {
		plugins: [tailwindcss()],
	},

	typescript: {
		typeCheck: true,
	},
});

