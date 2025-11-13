export default {
	routes: [
		{
			method: "POST",
			path: "/discord",
			handler: "discord.notify",
			config: { auth: false },
		},
	],
};
