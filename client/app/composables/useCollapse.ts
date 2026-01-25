import gsap from "gsap";

type CollapseTransitionOptions = {
	expandDurationSeconds?: number;
	collapseDurationSeconds?: number;
	expandEase?: string;
	collapseEase?: string;
};

function setExpandedInstantStyles(targetElement: HTMLElement): void {
	targetElement.style.height = "auto";

	targetElement.style.opacity = "1";
}

function setCollapsedInstantStyles(targetElement: HTMLElement): void {
	targetElement.style.height = "0px";

	targetElement.style.opacity = "0";
}

export function useCollapse(options: CollapseTransitionOptions = {}) {
	const {
		expandDurationSeconds = 0.3,
		collapseDurationSeconds = 0.35,
		expandEase = "power3.out",
		collapseEase = "power3.in",
	} = options;

	let isAnimating = false;

	const prefersReduced = () => import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function expandAnimation(element: Element, done: gsap.Callback) {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		const htmlElement = element as HTMLElement;

		if (prefersReduced()) {
			setExpandedInstantStyles(htmlElement);

			isAnimating = false;

			return done();
		}

		const expandedHeight = htmlElement.scrollHeight;

		gsap.set(htmlElement, {
			height: 0,
			opacity: 0,
			overflow: "hidden",
		});

		gsap.to(htmlElement, {
			height: expandedHeight,
			opacity: 1,
			duration: expandDurationSeconds,
			ease: expandEase,
			onComplete: () => {
				gsap.set(htmlElement, {
					height: "auto",
					clearProps: "overflow",
				});

				isAnimating = false;

				done();
			},
		});
	}

	function collapseAnimation(element: Element, done: gsap.Callback) {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		const htmlElement = element as HTMLElement;

		if (prefersReduced()) {
			setCollapsedInstantStyles(htmlElement);

			isAnimating = false;

			return done();
		}

		gsap.to(htmlElement, {
			height: 0,
			opacity: 0,
			duration: collapseDurationSeconds,
			ease: collapseEase,
			onComplete: () => {
				gsap.set(htmlElement, {
					clearProps: "all",
				});

				isAnimating = false;

				done();
			},
		});
	}

	return { expandAnimation, collapseAnimation };
}
