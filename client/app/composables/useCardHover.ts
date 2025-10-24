import { ref } from "vue";
import gsap from "gsap";

export function useCardHover() {
	const bgRef = ref<HTMLElement | null>(null);

	function onEnter() {
		if (!bgRef.value) {
			return;
		}

		gsap.to(bgRef.value, {
			scale: 75,
			opacity: 1,
			duration: 0.4,
			ease: "power2.out",
		});
	}

	function onLeave() {
		if (!bgRef.value) {
			return;
		}

		gsap.to(bgRef.value, {
			scale: 1,
			opacity: 0.3,
			duration: 0.4,
			ease: "power2.inOut",
		});
	}

	return { bgRef, onEnter, onLeave };
}
