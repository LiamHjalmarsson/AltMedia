import { ref, onMounted } from "vue";
import gsap from "gsap";

export function useHoverAnimation(isReversed = false) {
	const element = ref<HTMLElement | null>(null);
	const backgroundColor = ref<HTMLElement | null>(null);

	const onHover = (toRight = true) => {
		if (!backgroundColor.value) return;

		gsap.killTweensOf(backgroundColor.value);

		const leftValue = toRight ? "calc(100% - 44px)" : 0;

		gsap.timeline({ overwrite: "auto" })
			.to(backgroundColor.value, {
				width: "100%",
				left: 0,
				scale: 1.05,
				boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
				duration: 0.2,
				ease: "power2.in",
			})
			.to(backgroundColor.value, {
				width: "44px",
				left: leftValue,
				scale: 1,
				boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
				duration: 0.2,
				ease: "power2.inOut",
			});
	};

	const onClick = () => {
		if (!backgroundColor.value) return;

		gsap.killTweensOf(backgroundColor.value);

		gsap.timeline({ overwrite: "auto" }).to(backgroundColor.value, {
			width: "100%",
			scale: 1.1,
			boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
			left: 0,
			duration: 0.2,
			ease: "power2.out",
		});
	};

	function initAnimation() {
		if (!element.value || !backgroundColor.value) return;

		if (!isReversed) {
			element.value.addEventListener("mouseenter", () => onHover(true));

			element.value.addEventListener("mouseleave", () => onHover(false));
		} else {
			element.value.addEventListener("mouseenter", () => onHover(false));

			element.value.addEventListener("mouseleave", () => onHover(true));
		}

		element.value.addEventListener("click", onClick);
	}

	onMounted(initAnimation);

	return { element, backgroundColor, onHover, onClick };
}
