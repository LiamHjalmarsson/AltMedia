import { ref, onMounted } from "vue";
import gsap from "gsap";

export function useHoverAnimation() {
	const element = ref<HTMLElement | null>(null);

	const bg = ref<HTMLElement | null>(null);

	function initAnimation() {
		if (!element.value || !bg.value) {
			return;
		}

		const onHover = (toRight = true) => {
			if (!bg.value) return;

			gsap.killTweensOf(bg.value);

			const leftValue = toRight ? "calc(100% - 2.5rem)" : 0;

			gsap.timeline({ overwrite: "auto" })
				.to(bg.value, {
					width: "100%",
					left: 0,
					scale: 1.05,
					boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
					duration: 0.2,
					ease: "power2.in",
				})
				.to(bg.value, {
					width: "2.5rem",
					left: leftValue,
					scale: 1,
					boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
					duration: 0.2,
					ease: "power2.inOut",
				});
		};

		const animateClick = () => {
			if (!bg.value) return;

			gsap.killTweensOf(bg.value);

			gsap.timeline({ overwrite: "auto" }).to(bg.value, {
				width: "100%",
				scale: 1.1,
				boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
				left: 0,
				duration: 0.2,
				ease: "power2.out",
			});
		};

		element.value.addEventListener("mouseenter", () => onHover(true));

		element.value.addEventListener("mouseleave", () => onHover(false));

		element.value.addEventListener("click", animateClick);
	}

	onMounted(initAnimation);

	return { element, bg };
}
