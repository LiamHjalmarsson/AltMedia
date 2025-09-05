import gsap from "gsap";

export function useCollapse() {
	let isAnimating = false;

	function prefersReduceMotion() {
		return import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function onEnter(element: Element, done: () => void) {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		const target = element as HTMLElement;

		const height = target.scrollHeight;

		if (prefersReduceMotion()) {
			target.style.height = "auto";

			isAnimating = false;

			done();

			return;
		}

		gsap.set(target, {
			height: 0,
			overflow: "hidden",
		});

		gsap.to(target, {
			height,
			duration: 0.4,
			ease: "power3.out",
			onComplete: () => {
				gsap.set(target, {
					height: "auto",
					clearProps: "overflow",
				});

				isAnimating = false;

				done();
			},
		});
	}

	function onLeave(element: Element, done: () => void) {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		const target = element as HTMLElement;

		const height = target.scrollHeight;

		if (prefersReduceMotion()) {
			target.style.height = "0px";

			isAnimating = false;

			done();

			return;
		}

		gsap.set(target, {
			height,
			overflow: "hidden",
		});

		gsap.to(target, {
			height: 0,
			duration: 0.4,
			ease: "power3.in",
			onComplete: () => {
				gsap.set(target, { clearProps: "height,overflow" });

				isAnimating = false;

				done();
			},
		});
	}

	return { onEnter, onLeave };
}
