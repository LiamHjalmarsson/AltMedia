import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import type { Ref } from "vue";

export interface SnapScrollOptions {
	itemsRef: Ref<HTMLElement[]>;
	duration?: number;
	ease?: string;
	tolerance?: number;
	onChange?: (index: number) => void;
	enableFade?: boolean;
	enableScale?: boolean;
	inactiveOpacity?: number;
	inactiveScale?: number;
	transitionDuration?: number;
	preventDefault?: boolean;
	enableKeyboard?: boolean;
	startIndex?: number;
	/**
	 * Minimum screen width to enable snap scrolling (in pixels)
	 * @default 768
	 */
	minWidth?: number;
}

export const useSnapScroll = (options: SnapScrollOptions) => {
	const {
		itemsRef,
		duration = 1,
		ease = "power2.inOut",
		tolerance = 10,
		onChange,
		enableFade = true,
		enableScale = true,
		inactiveOpacity = 0.3,
		inactiveScale = 0.95,
		transitionDuration = 0.5,
		preventDefault = true,
		enableKeyboard = true,
		startIndex = 0,
		minWidth = 768,
	} = options;

	const currentIndex = ref(startIndex);
	const isAnimating = ref(false);
	const isEnabled = ref(true);
	const isDesktop = ref(false);

	const goToSection = (index: number, immediate = false) => {
		if (
			!isEnabled.value ||
			!isDesktop.value ||
			isAnimating.value ||
			index < 0 ||
			index >= itemsRef.value.length ||
			!itemsRef.value[index]
		) {
			return;
		}

		isAnimating.value = true;
		currentIndex.value = index;

		gsap.to(window, {
			scrollTo: {
				y: itemsRef.value[index],
				autoKill: false,
			},
			duration: immediate ? 0 : duration,
			ease,
			onComplete: () => {
				isAnimating.value = false;
				onChange?.(index);
			},
		});
	};

	const goToNext = () => {
		goToSection(currentIndex.value + 1);
	};

	const goToPrevious = () => {
		goToSection(currentIndex.value - 1);
	};

	const enable = () => {
		isEnabled.value = true;
	};

	const disable = () => {
		isEnabled.value = false;
	};

	const destroy = () => {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		Observer.getAll().forEach((observer) => observer.kill());
	};

	const checkScreenSize = () => {
		if (!import.meta.client) return;
		isDesktop.value = window.innerWidth >= minWidth;
	};

	const setup = () => {
		if (!import.meta.client) return;

		gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

		// Check initial screen size
		checkScreenSize();

		// Only setup animations on desktop
		if (!isDesktop.value) {
			// Reset all items to full opacity and scale on mobile
			itemsRef.value.forEach((item) => {
				gsap.set(item, {
					opacity: 1,
					scale: 1,
				});
			});
			return;
		}

		// Desktop animations
		itemsRef.value.forEach((item, index) => {
			gsap.set(item, {
				opacity: index === startIndex ? 1 : inactiveOpacity,
				scale: index === startIndex ? 1 : inactiveScale,
			});

			ScrollTrigger.create({
				trigger: item,
				start: "top center",
				end: "bottom center",
				onEnter: () => {
					currentIndex.value = index;

					if (enableFade || enableScale) {
						gsap.to(item, {
							opacity: enableFade ? 1 : undefined,
							scale: enableScale ? 1 : undefined,
							duration: transitionDuration,
						});
					}

					onChange?.(index);
				},
				onLeave: () => {
					if (enableFade || enableScale) {
						gsap.to(item, {
							opacity: enableFade ? inactiveOpacity : undefined,
							scale: enableScale ? inactiveScale : undefined,
							duration: transitionDuration,
						});
					}
				},
				onEnterBack: () => {
					currentIndex.value = index;

					if (enableFade || enableScale) {
						gsap.to(item, {
							opacity: enableFade ? 1 : undefined,
							scale: enableScale ? 1 : undefined,
							duration: transitionDuration,
						});
					}

					onChange?.(index);
				},
				onLeaveBack: () => {
					if (enableFade || enableScale) {
						gsap.to(item, {
							opacity: enableFade ? inactiveOpacity : undefined,
							scale: enableScale ? inactiveScale : undefined,
							duration: transitionDuration,
						});
					}
				},
			});
		});

		Observer.create({
			type: "wheel,touch",
			wheelSpeed: -1,
			onDown: () => {
				if (!isAnimating.value && isEnabled.value && isDesktop.value) {
					goToPrevious();
				}
			},
			onUp: () => {
				if (!isAnimating.value && isEnabled.value && isDesktop.value) {
					goToNext();
				}
			},
			tolerance,
			preventDefault: isDesktop.value ? preventDefault : false,
		});

		if (enableKeyboard && isDesktop.value) {
			const handleKeydown = (e: KeyboardEvent) => {
				if (!isEnabled.value || !isDesktop.value) return;

				switch (e.key) {
					case "ArrowDown":
					case "PageDown":
						e.preventDefault();
						goToNext();
						break;
					case "ArrowUp":
					case "PageUp":
						e.preventDefault();
						goToPrevious();
						break;
					case "Home":
						e.preventDefault();
						goToSection(0);
						break;
					case "End":
						e.preventDefault();
						goToSection(itemsRef.value.length - 1);
						break;
				}
			};

			window.addEventListener("keydown", handleKeydown);

			onBeforeUnmount(() => {
				window.removeEventListener("keydown", handleKeydown);
			});
		}

		const handleResize = () => {
			const wasDesktop = isDesktop.value;
			checkScreenSize();

			if (wasDesktop !== isDesktop.value) {
				destroy();

				setup();
			}
		};

		window.addEventListener("resize", handleResize);

		onBeforeUnmount(() => {
			window.removeEventListener("resize", handleResize);
		});
	};

	onMounted(() => {
		setup();
	});

	onBeforeUnmount(() => {
		destroy();
	});

	return {
		currentIndex: readonly(currentIndex),
		isAnimating: readonly(isAnimating),
		isEnabled: readonly(isEnabled),
		isDesktop: readonly(isDesktop),
		goToSection,
		goToNext,
		goToPrevious,
		enable,
		disable,
		destroy,
		setup,
	};
};
