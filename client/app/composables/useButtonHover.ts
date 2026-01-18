import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const PILL = 64;

export function useHoverAnimation(isReversed = false) {
	const element = ref<HTMLElement | null>(null);
	const backgroundColor = ref<HTMLElement | null>(null);

	let cleanup: (() => void) | null = null;

	const rightLeftPx = () => {
		const el = element.value;
		if (!el) return 0;
		return Math.max(0, el.clientWidth - PILL);
	};

	const setStart = () => {
		const bg = backgroundColor.value;
		if (!bg) return;

		gsap.set(bg, {
			width: PILL,
			left: isReversed ? rightLeftPx() : 0,
			scale: 1,
			clearProps: "boxShadow",
		});
	};

	const animateCollapseTo = (side: "left" | "right") => {
		const el = element.value;
		const bg = backgroundColor.value;
		if (!el || !bg) return;

		gsap.killTweensOf(bg);

		const fullW = el.clientWidth;
		const targetLeft = side === "left" ? 0 : rightLeftPx();

		gsap.timeline({ overwrite: "auto" })
			.to(bg, {
				width: fullW,
				left: 0,
				scale: 1.05,
				boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
				duration: 0.2,
				ease: "power2.in",
			})
			.to(bg, {
				width: PILL,
				left: targetLeft,
				scale: 1,
				boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
				duration: 0.2,
				ease: "power2.inOut",
			});
	};

	const onClick = () => {
		const el = element.value;
		const bg = backgroundColor.value;
		if (!el || !bg) return;

		gsap.killTweensOf(bg);

		gsap.to(bg, {
			width: el.clientWidth,
			left: 0,
			scale: 1.1,
			boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
			duration: 0.2,
			ease: "power2.out",
			overwrite: "auto",
		});
	};

	function initAnimation() {
		const el = element.value;
		const bg = backgroundColor.value;
		if (!el || !bg) return;

		// Startläge per knapp
		setStart();

		// Standard: hover -> right, leave -> left
		// Reversed: hover -> left, leave -> right
		const enter = () => animateCollapseTo(isReversed ? "left" : "right");
		const leave = () => animateCollapseTo(isReversed ? "right" : "left");

		el.addEventListener("mouseenter", enter);
		el.addEventListener("mouseleave", leave);
		el.addEventListener("click", onClick);

		// Om knappen får annan bredd (responsive), håll rätt startkant
		const ro = new ResizeObserver(() => setStart());
		ro.observe(el);

		cleanup = () => {
			ro.disconnect();
			el.removeEventListener("mouseenter", enter);
			el.removeEventListener("mouseleave", leave);
			el.removeEventListener("click", onClick);
		};
	}

	onMounted(initAnimation);
	onBeforeUnmount(() => cleanup?.());

	return { element, backgroundColor, onClick };
}
