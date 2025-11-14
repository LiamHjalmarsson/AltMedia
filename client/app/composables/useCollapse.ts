import gsap from "gsap";

export function useCollapse() {
	let animating = false;

	const prefersReduced = () => import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function onEnter(element: Element, done: gsap.Callback) {
		if (animating) {
			return;
		}
		animating = true;

		const el = element as HTMLElement;

		if (prefersReduced()) {
			el.style.height = "auto";
			el.style.opacity = "1";
			animating = false;
			return done();
		}

		const targetHeight = el.scrollHeight;

		gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });

		gsap.to(el, {
			height: targetHeight,
			opacity: 1,
			duration: 0.3,
			ease: "power3.out",
			onComplete: () => {
				gsap.set(el, { height: "auto", clearProps: "overflow" });
				animating = false;
				done();
			},
		});
	}

	function onLeave(element: Element, done: gsap.Callback) {
		if (animating) {
			return;
		}
		animating = true;

		const el = element as HTMLElement;

		if (prefersReduced()) {
			el.style.height = "0px";
			el.style.opacity = "0";
			animating = false;
			return done();
		}

		gsap.to(el, {
			height: 0,
			opacity: 0,
			duration: 0.35,
			ease: "power3.in",
			onComplete: () => {
				gsap.set(el, { clearProps: "all" });
				animating = false;
				done();
			},
		});
	}

	return { onEnter, onLeave };
}
