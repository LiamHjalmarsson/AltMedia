import gsap from "gsap";

export function useCollapse() {
	let isAnimating = false;

	function prefersReduce() {
		return import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function onEnter(element: Element, done: gsap.Callback) {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		const target = element as HTMLElement;

		if (prefersReduce()) {
			target.style.height = "auto";

			target.style.opacity = "1";

			isAnimating = false;

			done();

			return;
		}

		target.style.height = "0px";

		const height = target.scrollHeight;

		gsap.set(target, { height: 0, opacity: 0, overflow: "hidden", immediateRender: true });

		gsap.to(target, {
			height,
			opacity: 1,
			duration: 0.3,
			ease: "power3.out",
			overwrite: "auto",
			onComplete: () => {
				gsap.set(target, { height: "auto", clearProps: "overflow" });

				isAnimating = false;

				done();
			},
		});
	}

	function onLeave(element: Element, done: gsap.Callback) {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		const target = element as HTMLElement;

		if (prefersReduce()) {
			target.style.height = "0px";

			target.style.opacity = "0";

			isAnimating = false;

			done();

			return;
		}

		gsap.to(target, {
			height: 0,
			opacity: 0,
			duration: 0.4,
			ease: "power3.in",
			overwrite: "auto",
			onComplete: () => {
				gsap.set(target, { clearProps: "all" });
				isAnimating = false;
				done();
			},
		});
	}

	return { onEnter, onLeave };
}
