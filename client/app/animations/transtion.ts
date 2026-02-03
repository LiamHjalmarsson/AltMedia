import { gsap } from "gsap";

type GsapTimeline = gsap.core.Timeline;

type NuxtPageTransitionHooks = {
	name?: string;
	mode?: "out-in" | "in-out" | "default";
	css?: boolean;
	appear?: boolean;
	onBeforeEnter?: (el: Element) => void;
	onEnter?: (el: Element, done: () => void) => void;
	onAfterEnter?: (el: Element) => void;
	onEnterCancelled?: (el: Element) => void;
	onBeforeLeave?: (el: Element) => void;
	onLeave?: (el: Element, done: () => void) => void;
	onAfterLeave?: (el: Element) => void;
	onLeaveCancelled?: (el: Element) => void;
};

export type PageTransitionOptions = {
	durationEnter?: number; // seconds
	durationLeave?: number; // seconds
	enterFromY?: number; // px
	leaveToY?: number; // px
	easeEnter?: string;
	easeLeave?: string;
	enterDelay?: number; // seconds
};

type TransitionRuntime = {
	enterTl: GsapTimeline | null;
	leaveTl: GsapTimeline | null;
	rafId: number | null;
	cleanup: () => void;
};

const RUNTIME_KEY = "__gsap_page_transition__";

function getRuntime(el: Element): TransitionRuntime {
	const anyEl = el as unknown as Record<string, unknown>;
	const existing = anyEl[RUNTIME_KEY] as TransitionRuntime | undefined;
	if (existing) return existing;

	const runtime: TransitionRuntime = {
		enterTl: null,
		leaveTl: null,
		rafId: null,
		cleanup: () => {
			if (runtime.rafId !== null) {
				cancelAnimationFrame(runtime.rafId);
				runtime.rafId = null;
			}

			if (runtime.enterTl) {
				runtime.enterTl.kill();
				runtime.enterTl = null;
			}

			if (runtime.leaveTl) {
				runtime.leaveTl.kill();
				runtime.leaveTl = null;
			}

			gsap.killTweensOf(el);
			gsap.set(el, { clearProps: "opacity,transform,willChange" });
		},
	};

	anyEl[RUNTIME_KEY] = runtime;
	return runtime;
}

/**
 * Nuxt page transition (GSAP timeline):
 * - Enter: fade in + translateY -> 0
 * - Leave: fade out + translateY
 * - Enter waits until after mount/paint (rAF + nextTick)
 * - Clean teardown on cancel/leave
 */
export function createGsapPageTransition(options: PageTransitionOptions = {}): NuxtPageTransitionHooks {
	const {
		durationEnter = 0.5,
		durationLeave = 0.25,
		enterFromY = 14,
		leaveToY = -8,
		easeEnter = "power2.out",
		easeLeave = "power1.inOut",
		enterDelay = 0,
	} = options;

	return {
		name: "gsap-page",
		mode: "out-in",
		css: false,

		onBeforeEnter(el) {
			const runtime = getRuntime(el);
			runtime.cleanup();

			gsap.set(el, {
				opacity: 0,
				y: enterFromY,
				willChange: "opacity,transform",
			});
		},

		onEnter(el, done) {
			const runtime = getRuntime(el);

			// Ensure the route component is mounted/painted before animating.
			runtime.rafId = requestAnimationFrame(() => {
				runtime.rafId = null;

				void Promise.resolve().then(async () => {
					const { nextTick } = await import("vue");
					await nextTick();

					runtime.enterTl = gsap.timeline({
						delay: enterDelay,
						onComplete: () => {
							runtime.enterTl = null;
							gsap.set(el, { clearProps: "willChange" });
							done();
						},
					});

					runtime.enterTl.to(el, {
						opacity: 1,
						y: 0,
						duration: durationEnter,
						ease: easeEnter,
						clearProps: "transform",
					});
				});
			});
		},

		onEnterCancelled(el) {
			getRuntime(el).cleanup();
		},

		onBeforeLeave(el) {
			const runtime = getRuntime(el);

			if (runtime.enterTl) {
				runtime.enterTl.kill();
				runtime.enterTl = null;
			}

			gsap.set(el, { willChange: "opacity,transform" });
		},

		onLeave(el, done) {
			const runtime = getRuntime(el);

			runtime.leaveTl = gsap.timeline({
				onComplete: () => {
					runtime.leaveTl = null;
					done();
					runtime.cleanup();
				},
			});

			runtime.leaveTl.to(el, {
				opacity: 0,
				y: leaveToY,
				duration: durationLeave,
				ease: easeLeave,
			});
		},

		onLeaveCancelled(el) {
			getRuntime(el).cleanup();
		},

		onAfterLeave(el) {
			getRuntime(el).cleanup();
		},
	};
}
