import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const HOVER_DIAMETER_PX = 64;

type HoverCollapseSide = "left" | "right";

export function useHoverAnimation(isReversed = false) {
	const element = ref<HTMLElement | null>(null);

	const backgroundColor = ref<HTMLElement | null>(null);

	let cleanup: (() => void) | null = null;

	function getMaxRightAlignedLeftOffsetPx(): number {
		const interactiveElement = element.value;

		if (!interactiveElement) return 0;

		return Math.max(0, interactiveElement.clientWidth - HOVER_DIAMETER_PX);
	}

	function setToInitialState(): void {
		const backgroundElement = backgroundColor.value;

		if (!backgroundElement) return;

		gsap.set(backgroundElement, {
			width: HOVER_DIAMETER_PX,
			left: isReversed ? getMaxRightAlignedLeftOffsetPx() : 0,
			scale: 1,
			clearProps: "boxShadow",
		});
	}

	function animateExpandThenCollapseToSide(targetSide: HoverCollapseSide): void {
		const interactiveElement = element.value;

		const backgroundElement = backgroundColor.value;

		if (!interactiveElement || !backgroundElement) return;

		gsap.killTweensOf(backgroundElement);

		const fullWidthPx = interactiveElement.clientWidth;

		const targetLeftPx = targetSide === "left" ? 0 : getMaxRightAlignedLeftOffsetPx();

		gsap.timeline({ overwrite: "auto" })
			.to(backgroundElement, {
				width: fullWidthPx,
				left: 0,
				scale: 1.05,
				boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
				duration: 0.2,
				ease: "power2.in",
			})
			.to(backgroundElement, {
				width: HOVER_DIAMETER_PX,
				left: targetLeftPx,
				scale: 1,
				boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
				duration: 0.2,
				ease: "power2.inOut",
			});
	}

	const animateClick = () => {
		const interactiveElement = element.value;

		const backgroundElement = backgroundColor.value;

		if (!interactiveElement || !backgroundElement) return;

		gsap.killTweensOf(backgroundElement);

		gsap.to(backgroundElement, {
			width: interactiveElement.clientWidth,
			left: 0,
			scale: 1.1,
			boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
			duration: 0.2,
			ease: "power2.out",
			overwrite: "auto",
		});
	};

	function initAnimation() {
		const interactiveElement = element.value;

		const backgroundElement = backgroundColor.value;

		if (!interactiveElement || !backgroundElement) return;

		setToInitialState();

		const handlePointerEnter = () => animateExpandThenCollapseToSide(isReversed ? "left" : "right");

		const handlePointerLeave = () => animateExpandThenCollapseToSide(isReversed ? "right" : "left");

		interactiveElement.addEventListener("mouseenter", handlePointerEnter);

		interactiveElement.addEventListener("mouseleave", handlePointerLeave);

		interactiveElement.addEventListener("click", animateClick);

		const resizeObserver = new ResizeObserver(() => setToInitialState());

		resizeObserver.observe(interactiveElement);

		cleanup = () => {
			resizeObserver.disconnect();

			interactiveElement.removeEventListener("mouseenter", handlePointerEnter);

			interactiveElement.removeEventListener("mouseleave", handlePointerLeave);

			interactiveElement.removeEventListener("click", animateClick);
		};
	}

	onMounted(initAnimation);

	onBeforeUnmount(() => cleanup?.());

	return { element, backgroundColor, animateClick, setToInitialState };
}
