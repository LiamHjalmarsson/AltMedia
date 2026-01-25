import { defineNuxtPlugin } from "#app";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtPlugin(() => {
	if (import.meta.client) {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
	}

	return {
		provide: {
			gsap,
			ScrollTrigger,
			ScrollSmoother,
			ScrollToPlugin,
		},
	};
});
