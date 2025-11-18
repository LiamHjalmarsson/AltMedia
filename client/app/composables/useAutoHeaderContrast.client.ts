import { ref, watch, type Ref, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import type { Theme } from "~/types/enums";

extend([a11yPlugin]);

/**
 * Fullt explicit och detaljerad implementation av useAutoHeaderContrast.
 * Inga förkortade variabelnamn eller enbokstavsidentifierare används.
 */

type AutoHeaderContrastOptions = {
	baseSelector?: string;
	debounceMilliseconds?: number;
	onThemeChange?: (theme: Theme) => void;
};

const LUMINANCE_THRESHOLD = 0.5;
const DEFAULT_DEBOUNCE_MILLISECONDS = 100;
const NAVIGATION_RETRY_DELAYS_MILLISECONDS = [0, 50, 150, 400, 1000] as const;

/**
 * Global forced theme. Use the returned `force` method to override.
 */
const forcedThemeGlobal = ref<Theme | null>(null);

export function useAutoHeaderContrast(
	headerElementReference: Ref<HTMLElement | null>,
	options: AutoHeaderContrastOptions = {}
) {
	const internalThemeState = ref<Theme>("dark");

	const routerInstance = useRouter();

	/* Debounce configuration */
	const debounceMilliseconds = options.debounceMilliseconds ?? DEFAULT_DEBOUNCE_MILLISECONDS;

	/* GSAP ScrollTrigger instance (if initialized) */
	let scrollTriggerInstance: ScrollTrigger | null = null;

	/* Timers and observers tracked for cleanup */
	let resizeDebounceTimerIdentifier: number | null = null;
	let mutationDebounceTimerIdentifier: number | null = null;
	let mutationObserverInstance: MutationObserver | null = null;

	/* Explicit arrays for registered timers and image listeners so we can clear them deterministically */
	const navigationRetryTimeoutIdentifiers: number[] = [];
	const registeredImageLoadListeners: Array<{ imageElement: HTMLImageElement; listener: EventListener }> = [];

	/* Exposed computed theme (respects forced override) */
	const theme = computed(() => forcedThemeGlobal.value ?? internalThemeState.value);

	/* ---------------------------
	 * Utility helpers (very explicit)
	 * --------------------------- */

	/**
	 * Calculate median of an array of numbers.
	 * Returns undefined when array is empty.
	 */
	function calculateMedianOfNumberArray(numbers: number[]): number | undefined {
		if (!numbers.length) return undefined;

		const numbersSorted = [...numbers].sort((firstValue, secondValue) => firstValue - secondValue);

		const medianIndex = Math.floor(numbersSorted.length / 2);

		return numbersSorted[medianIndex];
	}

	/**
	 * Walk up DOM from provided element until a non-transparent background color is found.
	 * Falls back to computed body background color or a hard-coded fallback.
	 */
	function resolveNonTransparentBackgroundColorFromElement(startElement: HTMLElement | null): string {
		let elementToInspect = startElement;

		while (elementToInspect) {
			const computedBackgroundColor = getComputedStyle(elementToInspect).backgroundColor;
			// Check for common transparent representations explicitly
			if (
				computedBackgroundColor &&
				computedBackgroundColor !== "transparent" &&
				computedBackgroundColor !== "rgba(0, 0, 0, 0)"
			) {
				return computedBackgroundColor;
			}

			elementToInspect = elementToInspect.parentElement;
		}

		const bodyBackgroundColor = getComputedStyle(document.body).backgroundColor;

		return bodyBackgroundColor || "#f9fafa";
	}

	/**
	 * Resolve a base element to sample background from.
	 * Priority:
	 * 1. options.baseSelector (if provided and exists)
	 * 2. element with class .hero
	 * 3. the <main> element
	 * 4. document.body
	 */
	function resolveBackgroundSamplingBaseElement(): HTMLElement {
		if (options.baseSelector) {
			const explicitElement = document.querySelector<HTMLElement>(options.baseSelector);

			if (explicitElement) return explicitElement;
		}

		const heroElement = document.querySelector<HTMLElement>(".hero");

		if (heroElement) return heroElement;

		const mainElement = document.querySelector<HTMLElement>("main");

		if (mainElement) return mainElement;

		return document.body;
	}

	/**
	 * Create a grid of sampling points within the provided header rectangle.
	 * horizontalSampleCount defines how many columns of sample points to create (default 5).
	 * Vertical rows are fixed at 3 (25%, 50%, 75%).
	 */
	function generateHeaderSamplingPoints(headerRectangle: DOMRect, horizontalSampleCount = 5): [number, number][] {
		const verticalFractionPositions = [0.25, 0.5, 0.75].map((verticalFraction) => {
			return headerRectangle.top + headerRectangle.height * verticalFraction;
		});

		const horizontalStep = headerRectangle.width / (horizontalSampleCount + 1);

		const horizontalSamplePositions = Array.from({ length: horizontalSampleCount }, (_unused, index) => {
			return headerRectangle.left + horizontalStep * (index + 1);
		});

		const samplingPoints: [number, number][] = [];

		for (const verticalPosition of verticalFractionPositions) {
			for (const horizontalPosition of horizontalSamplePositions) {
				samplingPoints.push([horizontalPosition, verticalPosition]);
			}
		}

		return samplingPoints;
	}

	/**
	 * Collect luminance samples for an array of viewport points.
	 * Temporarily disables pointer-events on the header so elementFromPoint picks elements behind it.
	 */
	function collectLuminanceSamplesAtViewportPoints(
		viewportPoints: [number, number][],
		headerElement: HTMLElement
	): number[] {
		const previousPointerEventsValue = headerElement.style.pointerEvents;

		headerElement.style.pointerEvents = "none";

		const luminanceValues: number[] = [];

		try {
			for (const [sampleX, sampleY] of viewportPoints) {
				const elementAtPoint = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;

				if (!elementAtPoint) continue;

				const backgroundColorForElement = resolveNonTransparentBackgroundColorFromElement(elementAtPoint);

				const luminanceValue = colord(backgroundColorForElement).luminance();

				luminanceValues.push(luminanceValue);
			}
		} finally {
			// Always restore original pointer-events setting
			headerElement.style.pointerEvents = previousPointerEventsValue;
		}

		return luminanceValues;
	}

	/**
	 * Update internal theme using samples directly behind the header element.
	 */
	function updateThemeUsingHeaderBackgroundSamples(): void {
		const headerElement = headerElementReference.value;

		if (!headerElement) {
			return;
		}

		const headerBoundingRectangle = headerElement.getBoundingClientRect();

		const samplingPoints = generateHeaderSamplingPoints(headerBoundingRectangle, 5);

		const luminanceSampleValues = collectLuminanceSamplesAtViewportPoints(samplingPoints, headerElement);

		const medianLuminanceValue = calculateMedianOfNumberArray(luminanceSampleValues);

		if (medianLuminanceValue !== undefined) {
			internalThemeState.value = medianLuminanceValue < LUMINANCE_THRESHOLD ? "dark" : "light";
		}
	}

	/**
	 * Update internal theme using the base element (hero/main/body) background color.
	 * This is used as a fallback when header sampling is insufficient.
	 */
	function updateThemeUsingBaseElementBackground(): void {
		const baseElementToSample = resolveBackgroundSamplingBaseElement();

		const resolvedBaseBackgroundColor = resolveNonTransparentBackgroundColorFromElement(baseElementToSample);

		const baseLuminanceValue = colord(resolvedBaseBackgroundColor).luminance();

		internalThemeState.value = baseLuminanceValue < LUMINANCE_THRESHOLD ? "dark" : "light";
	}

	/**
	 * Refresh theme by first using base element then header samples, then asking ScrollTrigger to refresh.
	 */
	function refreshComputedTheme(): void {
		updateThemeUsingBaseElementBackground();

		updateThemeUsingHeaderBackgroundSamples();

		// Ask GSAP ScrollTrigger to recalculate if present
		ScrollTrigger.refresh();
	}

	/* ---------------------------
	 * Navigation retry timers management (explicit names)
	 * --------------------------- */

	/**
	 * Clear and remove all scheduled navigation retry timers.
	 * Uses explicit naming for each identifier.
	 */
	function clearAllScheduledNavigationRetryTimeouts(): void {
		for (const retryTimeoutIdentifier of navigationRetryTimeoutIdentifiers) {
			clearTimeout(retryTimeoutIdentifier);
		}

		// Reset the array while keeping the same reference
		navigationRetryTimeoutIdentifiers.length = 0;
	}

	/**
	 * Schedule a set of navigation retry timers to repeatedly refresh theme after navigation completes.
	 * This helps handle asynchronous content that appears shortly after route change (images, dynamic blocks).
	 */
	function scheduleNavigationRetryThemeRefreshTimers(): void {
		// Always clear previous timers first
		clearAllScheduledNavigationRetryTimeouts();

		for (const retryDelayMilliseconds of NAVIGATION_RETRY_DELAYS_MILLISECONDS) {
			const newTimeoutIdentifier = window.setTimeout(() => {
				refreshComputedTheme();
			}, retryDelayMilliseconds);

			navigationRetryTimeoutIdentifiers.push(newTimeoutIdentifier);
		}
	}

	/**
	 * Disconnect previous mutation observer and remove registered image listeners.
	 * Then set up a new observer and attach load listeners to images under the base element.
	 */
	function observeBaseElementMutationsAndImageLoads(): void {
		// Disconnect previous observer if any
		if (mutationObserverInstance) {
			mutationObserverInstance.disconnect();

			mutationObserverInstance = null;
		}

		// Remove previous image listeners
		for (const registeredListener of registeredImageLoadListeners) {
			registeredListener.imageElement.removeEventListener("load", registeredListener.listener);
		}

		registeredImageLoadListeners.length = 0;

		const baseElementToObserve = resolveBackgroundSamplingBaseElement();

		if (!baseElementToObserve) return;

		// Create and observe DOM mutations
		mutationObserverInstance = new MutationObserver(() => {
			if (mutationDebounceTimerIdentifier) {
				clearTimeout(mutationDebounceTimerIdentifier);
			}

			mutationDebounceTimerIdentifier = window.setTimeout(() => {
				refreshComputedTheme();
			}, 50);
		});

		mutationObserverInstance.observe(baseElementToObserve, {
			attributes: true,
			childList: true,
			subtree: true,
		});

		// Attach load listeners to any images that are not yet complete
		const imageElements = baseElementToObserve.querySelectorAll<HTMLImageElement>("img");
		for (const imageElement of imageElements) {
			if (!imageElement.complete) {
				const loadEventListener = () => {
					refreshComputedTheme();
				};

				imageElement.addEventListener("load", loadEventListener);

				registeredImageLoadListeners.push({ imageElement, listener: loadEventListener });
			}
		}
	}

	/**
	 * Debounced window resize handler that refreshes theme after configured debounce delay.
	 */
	function onWindowResizeDebounced(): void {
		if (resizeDebounceTimerIdentifier) {
			clearTimeout(resizeDebounceTimerIdentifier);
		}

		resizeDebounceTimerIdentifier = window.setTimeout(() => {
			refreshComputedTheme();
		}, debounceMilliseconds);
	}

	/**
	 * Initialize the auto header contrast system:
	 * - register GSAP ScrollTrigger
	 * - create a ScrollTrigger instance that calls update on scroll/refresh
	 * - attach resize listener
	 * - observe base element mutations and image loads
	 * - hook into router navigation to schedule retries
	 */
	function initializeAutoHeaderContrast(): void {
		if (typeof window === "undefined") {
			// Do not initialize on server
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		scrollTriggerInstance = ScrollTrigger.create({
			trigger: document.documentElement,
			start: "top top",
			end: "bottom bottom",
			onUpdate: updateThemeUsingHeaderBackgroundSamples,
			onRefresh: updateThemeUsingHeaderBackgroundSamples,
		});

		window.addEventListener("resize", onWindowResizeDebounced, { passive: true });

		// Initial calculation and observation on the next animation frame
		requestAnimationFrame(() => {
			refreshComputedTheme();

			observeBaseElementMutationsAndImageLoads();
		});

		// After every route change, schedule retries and re-observe
		routerInstance.afterEach(() => {
			nextTick().then(() => {
				requestAnimationFrame(() => {
					scheduleNavigationRetryThemeRefreshTimers();

					observeBaseElementMutationsAndImageLoads();
				});
			});
		});
	}

	/**
	 * Clean up everything created by initializeAutoHeaderContrast:
	 * - kill ScrollTrigger
	 * - clear timers
	 * - disconnect mutation observer
	 * - remove image listeners
	 * - remove window event listeners
	 */
	function destroyAutoHeaderContrast(): void {
		if (scrollTriggerInstance) {
			scrollTriggerInstance.kill();

			scrollTriggerInstance = null;
		}

		if (resizeDebounceTimerIdentifier) {
			clearTimeout(resizeDebounceTimerIdentifier);

			resizeDebounceTimerIdentifier = null;
		}

		if (mutationDebounceTimerIdentifier) {
			clearTimeout(mutationDebounceTimerIdentifier);

			mutationDebounceTimerIdentifier = null;
		}

		// Clear navigation retry timers
		clearAllScheduledNavigationRetryTimeouts();

		// Disconnect mutation observer
		if (mutationObserverInstance) {
			mutationObserverInstance.disconnect();

			mutationObserverInstance = null;
		}

		// Remove image load listeners
		for (const registeredListener of registeredImageLoadListeners) {
			registeredListener.imageElement.removeEventListener("load", registeredListener.listener);
		}

		registeredImageLoadListeners.length = 0;

		// Remove resize listener
		window.removeEventListener("resize", onWindowResizeDebounced);
	}

	/* ---------------------------
	 * Optional callback watcher
	 * --------------------------- */

	if (options.onThemeChange) {
		watch(
			theme,
			(newTheme) => {
				options.onThemeChange?.(newTheme);
			},
			{ immediate: true }
		);
	}

	/* ---------------------------
	 * Public API
	 * --------------------------- */

	return {
		theme,
		force: (value: Theme | null) => {
			forcedThemeGlobal.value = value;
		},
		init: initializeAutoHeaderContrast,
		destroy: destroyAutoHeaderContrast,
		refresh: refreshComputedTheme,
	};
}
