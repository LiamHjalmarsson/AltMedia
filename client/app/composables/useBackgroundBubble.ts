import gsap from "gsap";

type CardHoverBackgroundBubbleOptions = {
	hoverScale?: number;
	idleScale?: number;
	hoverOpacity?: number;
	idleOpacity?: number;
	enterDurationSeconds?: number;
	leaveDurationSeconds?: number;
	enterEase?: string;
	leaveEase?: string;
};

function userPrefersReducedMotion(): boolean {
	return import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setInlineBubbleStyles(bubbleEl: HTMLElement, scale: number, opacity: number): void {
	bubbleEl.style.transform = `scale(${scale})`;

	bubbleEl.style.opacity = String(opacity);
}

export function useBackgroundBubble(options: CardHoverBackgroundBubbleOptions = {}) {
	const {
		hoverScale = 110,
		idleScale = 0,
		hoverOpacity = 1,
		idleOpacity = 0.3,
		enterDurationSeconds = 0.4,
		leaveDurationSeconds = 0.4,
		enterEase = "power3.out",
		leaveEase = "power3.inOut",
	} = options;

	const hoverBubbleElementRef: Ref<HTMLElement | null> = ref(null);

	function animateBubbleToHoverState(): void {
		const bubbleElement = hoverBubbleElementRef.value;

		if (!bubbleElement) return;

		gsap.killTweensOf(bubbleElement);

		if (userPrefersReducedMotion()) {
			setInlineBubbleStyles(bubbleElement, hoverScale, hoverOpacity);

			return;
		}

		gsap.to(bubbleElement, {
			scale: hoverScale,
			opacity: hoverOpacity,
			duration: enterDurationSeconds,
			ease: enterEase,
		});
	}

	function animateBubbleToIdleState(): void {
		const bubbleElement = hoverBubbleElementRef.value;

		if (!bubbleElement) return;

		gsap.killTweensOf(bubbleElement);

		if (userPrefersReducedMotion()) {
			setInlineBubbleStyles(bubbleElement, idleScale, idleOpacity);

			return;
		}

		gsap.to(bubbleElement, {
			scale: idleScale,
			opacity: idleOpacity,
			duration: leaveDurationSeconds,
			ease: leaveEase,
		});
	}

	return {
		hoverBubbleElementRef,
		animateBubbleToHoverState,
		animateBubbleToIdleState,
	};
}
