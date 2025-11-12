import { ref, watch, type Ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import type { Theme } from "~/types/enums";

extend([a11yPlugin]);

type AutoHeaderContrastOptions = {
	baseSelector?: string;
	debounceMilliseconds?: number;
	onThemeChange?: (theme: Theme) => void;
};

const LUMINANCE_THRESHOLD = 0.5;

const DEFAULT_DEBOUNCE_MS = 100;

const NAVIGATION_RETRY_DELAYS = [0, 50, 150, 400, 1000] as const;

/**
 * Composable that automatically determines whether a header should render
 * in light or dark theme based on background contrast.
 *
 * It samples pixels under the header, calculates luminance, and updates `theme`.
 */
export function useAutoHeaderContrast(
	headerElementReference: Ref<HTMLElement | null>,
	options: AutoHeaderContrastOptions = {}
) {
	const currentTheme = ref<Theme>("dark");

	let scrollTriggerInstance: ScrollTrigger | null = null;

	let resizeDebounceTimer: number | null = null;

	let mutationDebounceTimer: number | null = null;

	let mutationObserverInstance: MutationObserver | null = null;

	const navigationRetryTimers: number[] = [];

	const imageLoadEventListeners: Array<{ img: HTMLImageElement; handler: EventListener }> = [];

	const router = useRouter();

	const debounceMs = options.debounceMilliseconds ?? DEFAULT_DEBOUNCE_MS;

	/**
	 * Calculates the median value of an array of numbers.
	 */
	function calculateMedian(values: number[]) {
		if (values.length === 0) {
			return undefined;
		}

		const sorted = [...values].sort((a, b) => a - b);

		return sorted[Math.floor(sorted.length / 2)];
	}

	/**
	 * Goes up the DOM until it finds a non-transparent background color.
	 * Fall back to the <body> background.
	 */
	function resolveBackgroundColor(element: HTMLElement | null): string {
		if (!element) {
			return "#f9fafa";
		}

		let current: HTMLElement | null = element;

		while (current) {
			const backgroundColor = getComputedStyle(current).backgroundColor;

			if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") {
				return backgroundColor;
			}

			current = current.parentElement;
		}

		const bodyBackground = getComputedStyle(document.body).backgroundColor;

		return bodyBackground || "#f9fafa";
	}

	/**
	 * Generates a grid of sample points across the header rectangle.
	 * Example: 5 horizontal x 3 vertical = 15 sample points.
	 */
	function sampleHeaderPoints(headerRectangle: DOMRect, sampleCount = 5) {
		const verticalPoints = [0.25, 0.5, 0.75].map((factor) => headerRectangle.top + headerRectangle.height * factor);

		const horizontalStep = headerRectangle.width / (sampleCount + 1);

		const horizontalPoints = Array.from(
			{ length: sampleCount },
			(_, index) => headerRectangle.left + horizontalStep * (index + 1)
		);

		return verticalPoints.flatMap((y) => horizontalPoints.map((x) => [x, y] as [number, number]));
	}

	/**
	 * Collects luminance values at each sampled point under the header.
	 * Temporarily disables pointer-events so `elementFromPoint` ignores the header itself.
	 */
	function collectLuminanceSamples(points: [number, number][], headerElement: HTMLElement) {
		const luminances: number[] = [];

		const previousPointerEvents = headerElement.style.pointerEvents;

		headerElement.style.pointerEvents = "none";

		try {
			for (const [x, y] of points) {
				const targetElement = document.elementFromPoint(x, y) as HTMLElement | null;

				if (!targetElement) {
					continue;
				}

				const backgroundColor = resolveBackgroundColor(targetElement);

				luminances.push(colord(backgroundColor).luminance());
			}
		} finally {
			headerElement.style.pointerEvents = previousPointerEvents;
		}

		return luminances;
	}

	/**
	 * Chooses the base element to sample from:
	 * 1. custom selector
	 * 2. hero
	 * 3. main
	 * 4. body
	 */
	function getBaseElement() {
		const explicit = options.baseSelector ? document.querySelector<HTMLElement>(options.baseSelector) : null;

		if (explicit) {
			return explicit;
		}

		return (
			document.querySelector<HTMLElement>(".hero") ?? document.querySelector<HTMLElement>("main") ?? document.body
		);
	}

	/**
	 * Updates theme based on the pixels directly behind the header.
	 */
	function updateThemeFromHeader() {
		if (!headerElementReference.value) {
			return;
		}

		const headerRectangle = headerElementReference.value.getBoundingClientRect();

		const luminanceSamples = collectLuminanceSamples(
			sampleHeaderPoints(headerRectangle),
			headerElementReference.value
		);

		const medianLuminance = calculateMedian(luminanceSamples);

		if (medianLuminance !== undefined) {
			currentTheme.value = medianLuminance < LUMINANCE_THRESHOLD ? "dark" : "light";
		}
	}

	/**
	 * Updates theme from the hero element or fallback element.
	 * Used when header sampling has no reliable data.
	 */
	function updateThemeFromBaseElement() {
		const baseElement = getBaseElement();

		const luminance = colord(resolveBackgroundColor(baseElement)).luminance();

		currentTheme.value = luminance < LUMINANCE_THRESHOLD ? "dark" : "light";
	}

	/**
	 * Refresh theme (base + header) and tell GSAP to refresh ScrollTrigger.
	 */
	function refreshTheme() {
		updateThemeFromBaseElement();

		updateThemeFromHeader();

		ScrollTrigger.refresh();
	}

	/**
	 * Clears all scheduled navigation retry timers.
	 */
	function clearNavigationRetryTimers() {
		navigationRetryTimers.splice(0).forEach((timerId) => {
			clearTimeout(timerId);
		});
	}

	/**
	 * When navigating, schedule retries to re-check theme.
	 * This accounts for async content and images that may load late.
	 */
	function scheduleNavigationRetries() {
		clearNavigationRetryTimers();

		NAVIGATION_RETRY_DELAYS.forEach((delay) => {
			navigationRetryTimers.push(window.setTimeout(refreshTheme, delay));
		});
	}

	/**
	 * Observes DOM changes and image loads on the hero/base element.
	 * Ensures theme updates when background changes or images finish loading.
	 */
	function observeBaseElementAndImages() {
		mutationObserverInstance?.disconnect();

		mutationObserverInstance = null;

		imageLoadEventListeners.forEach(({ img, handler }) => {
			img.removeEventListener("load", handler);
		});

		imageLoadEventListeners.length = 0;

		const baseElement = getBaseElement();

		if (!baseElement) {
			return;
		}

		mutationObserverInstance = new MutationObserver(() => {
			if (mutationDebounceTimer) {
				clearTimeout(mutationDebounceTimer);
			}

			mutationDebounceTimer = window.setTimeout(refreshTheme, 50);
		});

		mutationObserverInstance.observe(baseElement, {
			attributes: true,
			childList: true,
			subtree: true,
		});

		baseElement.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
			if (!img.complete) {
				const handler = () => {
					refreshTheme();
				};

				img.addEventListener("load", handler);

				imageLoadEventListeners.push({ img, handler });
			}
		});
	}

	/**
	 * Debounced resize handler.
	 */
	function handleResize() {
		if (resizeDebounceTimer) {
			clearTimeout(resizeDebounceTimer);
		}

		resizeDebounceTimer = window.setTimeout(refreshTheme, debounceMs);
	}

	/**
	 * Initializes the composable:
	 * - Sets up GSAP ScrollTrigger
	 * - Adds resize listener
	 * - Observes DOM + images
	 * - Hooks into Vue Router navigation
	 */
	function initAutoHeaderContrast() {
		if (typeof window === "undefined") {
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		scrollTriggerInstance = ScrollTrigger.create({
			trigger: document.documentElement,
			start: "top top",
			end: "bottom bottom",
			onUpdate: updateThemeFromHeader,
			onRefresh: updateThemeFromHeader,
		});

		window.addEventListener("resize", handleResize, { passive: true });

		requestAnimationFrame(() => {
			refreshTheme();

			observeBaseElementAndImages();
		});

		router.afterEach(() => {
			nextTick().then(() => {
				requestAnimationFrame(() => {
					scheduleNavigationRetries();

					observeBaseElementAndImages();
				});
			});
		});
	}

	/**
	 * Cleans up everything created by init:
	 * - Kills ScrollTrigger
	 * - Removes listeners
	 * - Disconnects observers
	 * - Clears timers
	 */
	function destroyAutoHeaderContrast() {
		scrollTriggerInstance?.kill();

		scrollTriggerInstance = null;

		if (resizeDebounceTimer) {
			clearTimeout(resizeDebounceTimer);
		}

		if (mutationDebounceTimer) {
			clearTimeout(mutationDebounceTimer);
		}

		clearNavigationRetryTimers();

		mutationObserverInstance?.disconnect();

		mutationObserverInstance = null;

		imageLoadEventListeners.forEach(({ img, handler }) => {
			img.removeEventListener("load", handler);
		});

		window.removeEventListener("resize", handleResize);
	}

	// Trigger onThemeChange callback if provided
	if (options.onThemeChange) {
		watch(
			currentTheme,
			(theme) => {
				options.onThemeChange?.(theme);
			},
			{ immediate: true }
		);
	}

	return {
		theme: currentTheme,
		init: initAutoHeaderContrast, // start logic (call in onMounted)
		destroy: destroyAutoHeaderContrast, // cleanup (call in onBeforeUnmount)
		refresh: refreshTheme, // manually force refresh
	};
}
