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

	image: {
		dir: "public/images",
		strapi: {
			baseURL: import.meta.env.STRAPI_URL || "http://localhost:1337",
		},
	},

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
		{
			path: "~/components/richtextBlocks",
			pathPrefix: false,
			global: true,
		},
	],

	hooks: {
		"pages:extend"(pages) {
			pages.forEach((page) => {
				if (page.path.startsWith("/services")) {
					page.path = page.path.replace("/services", "/tjänster");
				}

				if (page.path.startsWith("/projects")) {
					page.path = page.path.replace("/projects", "/projekt");
				}

				if (page.path.startsWith("/articles")) {
					page.path = page.path.replace("/articles", "/artiklar");
				}

				if (page.path.startsWith("/contact")) {
					page.path = page.path.replace("/contact", "/kontakt");
				}

				if (page.path.startsWith("/startProject")) {
					page.path = page.path.replace("/startProject", "/starta-projekt");
				}
			});
		},
	},
});
