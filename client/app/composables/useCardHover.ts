import { ref } from "vue";
import gsap from "gsap";

export function useCardHover() {
	const bgRef = ref<HTMLElement | null>(null);

	const prefersReducedMotion = () =>
		import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function onEnter() {
		const element = bgRef.value;

		if (!element) return;

		gsap.killTweensOf(element);

		if (prefersReducedMotion()) {
			element.style.opacity = "1";

			element.style.transform = "scale(1.1)";

			return;
		}

		gsap.to(element, {
			scale: 95,
			opacity: 1,
			duration: 0.4,
			// transformOrigin: "center",
			ease: "power3.out",
		});
	}

	function onLeave() {
		const element = bgRef.value;

		if (!element) {
			return;
		}

		if (prefersReducedMotion()) {
			element.style.opacity = "0.3";

			element.style.transform = "scale(1.1)";

			return;
		}

		gsap.to(element, {
			scale: 0,
			opacity: 0.3,
			duration: 0.4,
			// transformOrigin: "center",
			ease: "power3.inOut",
		});
	}

	return { bgRef, onEnter, onLeave };
}
