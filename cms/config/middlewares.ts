export default [
	"strapi::logger",
	"strapi::errors",
	{
		name: "strapi::security",
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					"connect-src": ["'self'", "https:"],
					"img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
					"media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	{
		name: "strapi::cors",
		config: {
			enabled: true,
			origin: ["http://localhost:3000", "http://localhost:3001", "https://alt-media-five.vercel.app/"],
			headers: ["*"],
			methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		},
	},
	"strapi::poweredBy",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];

