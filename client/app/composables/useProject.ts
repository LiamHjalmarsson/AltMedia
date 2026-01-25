import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

type HoverAnimatedProjectCardSelectors = {
	titleSelector: string;
	overlaySelector: string;
};

export function useProject(
	selectors: HoverAnimatedProjectCardSelectors = {
		titleSelector: ".project-title",
		overlaySelector: ".project-overlay",
	},
) {
	const projectCardElements = ref<HTMLElement[]>([]);

	let gsapContext: gsap.Context | null = null;

	function registerProjectCardElement(element: Element | null, index: number): void {
		if (element instanceof HTMLElement) {
			projectCardElements.value[index] = element;
		}
	}

	function isDesktopViewport(): boolean {
		if (!import.meta.client) return false;
		return window.matchMedia("(min-width: 1024px)").matches;
	}

	function getTitleElement(card: HTMLElement): HTMLElement | null {
		return card.querySelector<HTMLElement>(selectors.titleSelector);
	}

	function getOverlayElement(card: HTMLElement): HTMLElement | null {
		return card.querySelector<HTMLElement>(selectors.overlaySelector);
	}

	function setupInitialStyles(cards: HTMLElement[]): void {
		gsap.set(cards, { flex: "1 1 0%" });

		for (const card of cards) {
			const titleElement = getTitleElement(card);
			const overlayElement = getOverlayElement(card);

			if (titleElement) gsap.set(titleElement, { opacity: 0, y: 30, pointerEvents: "none" });
			if (overlayElement) gsap.set(overlayElement, { opacity: 0 });
		}
	}

	function animateIdleState(cards: HTMLElement[]): void {
		gsap.to(cards, { flex: "1 1 0%", duration: 0.3, ease: "power2.inOut" });

		for (const card of cards) {
			const titleElement = getTitleElement(card);
			const overlayElement = getOverlayElement(card);

			if (titleElement) gsap.to(titleElement, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
			if (overlayElement) gsap.to(overlayElement, { opacity: 0, duration: 0.15, ease: "power2.inOut" });
		}
	}

	function animateHoverState(cards: HTMLElement[], activeIndex: number): void {
		cards.forEach((card, index) => {
			gsap.to(card, {
				flex: index === activeIndex ? "3 1 0%" : "1 1 0%",
				duration: 0.25,
				ease: "power2.out",
			});
		});

		const activeCard = cards[activeIndex];
		if (!activeCard) return;

		const titleElement = getTitleElement(activeCard);
		const overlayElement = getOverlayElement(activeCard);

		if (overlayElement) {
			gsap.to(overlayElement, { opacity: 0.5, duration: 0.18, ease: "power1.out" });
		}

		if (titleElement) {
			gsap.to(titleElement, {
				opacity: 1,
				y: -35,
				duration: 0.35,
				delay: 0.05,
				ease: "power2.out",
			});
		}
	}

	function handleProjectCardMouseEnter(activeIndex: number): void {
		const cards = projectCardElements.value.filter(Boolean);
		if (!cards.length) return;

		gsap.killTweensOf(cards);

		const activeCard = cards[activeIndex];
		if (!activeCard) return;

		const titleElement = getTitleElement(activeCard);
		const overlayElement = getOverlayElement(activeCard);

		gsap.killTweensOf([titleElement, overlayElement].filter(Boolean) as gsap.TweenTarget);

		animateHoverState(cards, activeIndex);
	}

	function handleProjectCardMouseLeave(): void {
		const cards = projectCardElements.value.filter(Boolean);
		if (!cards.length) return;

		gsap.killTweensOf(cards);

		for (const card of cards) {
			const titleElement = getTitleElement(card);
			const overlayElement = getOverlayElement(card);
			gsap.killTweensOf([titleElement, overlayElement].filter(Boolean) as gsap.TweenTarget);
		}

		animateIdleState(cards);
	}

	onMounted(async () => {
		await nextTick();

		if (!isDesktopViewport()) return;

		const cards = projectCardElements.value.filter(Boolean);
		if (!cards.length) return;

		gsapContext = gsap.context(() => {
			setupInitialStyles(cards);
			animateIdleState(cards);
		});
	});

	onBeforeUnmount(() => {
		gsapContext?.revert();
		gsapContext = null;
	});

	return {
		registerProjectCardElement,
		handleProjectCardMouseEnter,
		handleProjectCardMouseLeave,
	};
}
