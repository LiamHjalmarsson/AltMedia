import { ref, watch, type Ref, nextTick, computed } from "vue";
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

	const debounceMilliseconds = options.debounceMilliseconds ?? DEFAULT_DEBOUNCE_MILLISECONDS;

	let scrollTriggerInstance: ScrollTrigger | null = null;

	let resizeDebounceTimerIdentifier: number | null = null;
	let mutationDebounceTimerIdentifier: number | null = null;
	let mutationObserverInstance: MutationObserver | null = null;

	const navigationRetryTimeoutIdentifiers: number[] = [];
	const registeredImageLoadListeners: Array<{ imageElement: HTMLImageElement; listener: EventListener }> = [];

	const theme = computed(() => forcedThemeGlobal.value ?? internalThemeState.value);

	function calculateMedianOfNumberArray(numbers: number[]): number | undefined {
		if (!numbers.length) return undefined;

		const numbersSorted = [...numbers].sort((firstValue, secondValue) => firstValue - secondValue);
		const medianIndex = Math.floor(numbersSorted.length / 2);

		return numbersSorted[medianIndex];
	}

	function resolveNonTransparentBackgroundColorFromElement(startElement: HTMLElement | null): string {
		let elementToInspect = startElement;

		while (elementToInspect) {
			const computedBackgroundColor = getComputedStyle(elementToInspect).backgroundColor;

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
			headerElement.style.pointerEvents = previousPointerEventsValue;
		}

		return luminanceValues;
	}

	/**
	 * NEW: explicit override via data attribute
	 * Example: <section class="hero" data-header-theme="light">
	 */
	function resolveThemeOverrideFromElement(startElement: HTMLElement | null): Theme | null {
		let elementToInspect = startElement;

		while (elementToInspect) {
			const overrideValue = elementToInspect.getAttribute("data-header-theme");

			if (overrideValue === "light" || overrideValue === "dark") {
				return overrideValue as Theme;
			}

			elementToInspect = elementToInspect.parentElement;
		}

		return null;
	}

	function updateThemeUsingHeaderBackgroundSamples(): void {
		const headerElement = headerElementReference.value;
		if (!headerElement) return;

		const headerBoundingRectangle = headerElement.getBoundingClientRect();
		const samplingPoints = generateHeaderSamplingPoints(headerBoundingRectangle, 5);

		const previousPointerEventsValue = headerElement.style.pointerEvents;
		headerElement.style.pointerEvents = "none";

		try {
			// 1) override wins (fixes gradients/background-image/canvas)
			for (const [sampleX, sampleY] of samplingPoints) {
				const elementAtPoint = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;
				if (!elementAtPoint) continue;

				const overrideTheme = resolveThemeOverrideFromElement(elementAtPoint);
				if (overrideTheme) {
					internalThemeState.value = overrideTheme;
					return;
				}
			}

			// 2) fallback to luminance for solid colors
			const luminanceSampleValues = collectLuminanceSamplesAtViewportPoints(samplingPoints, headerElement);
			const medianLuminanceValue = calculateMedianOfNumberArray(luminanceSampleValues);

			if (medianLuminanceValue !== undefined) {
				internalThemeState.value = medianLuminanceValue < LUMINANCE_THRESHOLD ? "dark" : "light";
			}
		} finally {
			headerElement.style.pointerEvents = previousPointerEventsValue;
		}
	}

	function updateThemeUsingBaseElementBackground(): void {
		const baseElementToSample = resolveBackgroundSamplingBaseElement();

		// override first
		const overrideTheme = resolveThemeOverrideFromElement(baseElementToSample);
		if (overrideTheme) {
			internalThemeState.value = overrideTheme;
			return;
		}

		const resolvedBaseBackgroundColor = resolveNonTransparentBackgroundColorFromElement(baseElementToSample);
		const baseLuminanceValue = colord(resolvedBaseBackgroundColor).luminance();

		internalThemeState.value = baseLuminanceValue < LUMINANCE_THRESHOLD ? "dark" : "light";
	}

	function refreshComputedTheme(): void {
		updateThemeUsingBaseElementBackground();
		updateThemeUsingHeaderBackgroundSamples();
		ScrollTrigger.refresh();
	}

	function clearAllScheduledNavigationRetryTimeouts(): void {
		for (const retryTimeoutIdentifier of navigationRetryTimeoutIdentifiers) {
			clearTimeout(retryTimeoutIdentifier);
		}
		navigationRetryTimeoutIdentifiers.length = 0;
	}

	function scheduleNavigationRetryThemeRefreshTimers(): void {
		clearAllScheduledNavigationRetryTimeouts();

		for (const retryDelayMilliseconds of NAVIGATION_RETRY_DELAYS_MILLISECONDS) {
			const newTimeoutIdentifier = window.setTimeout(() => {
				refreshComputedTheme();
			}, retryDelayMilliseconds);

			navigationRetryTimeoutIdentifiers.push(newTimeoutIdentifier);
		}
	}

	function observeBaseElementMutationsAndImageLoads(): void {
		if (mutationObserverInstance) {
			mutationObserverInstance.disconnect();
			mutationObserverInstance = null;
		}

		for (const registeredListener of registeredImageLoadListeners) {
			registeredListener.imageElement.removeEventListener("load", registeredListener.listener);
		}
		registeredImageLoadListeners.length = 0;

		const baseElementToObserve = resolveBackgroundSamplingBaseElement();
		if (!baseElementToObserve) return;

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

	function onWindowResizeDebounced(): void {
		if (resizeDebounceTimerIdentifier) {
			clearTimeout(resizeDebounceTimerIdentifier);
		}

		resizeDebounceTimerIdentifier = window.setTimeout(() => {
			refreshComputedTheme();
		}, debounceMilliseconds);
	}

	function initializeAutoHeaderContrast(): void {
		if (typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		scrollTriggerInstance = ScrollTrigger.create({
			trigger: document.documentElement,
			start: "top top",
			end: "bottom bottom",
			onUpdate: updateThemeUsingHeaderBackgroundSamples,
			onRefresh: updateThemeUsingHeaderBackgroundSamples,
		});

		window.addEventListener("resize", onWindowResizeDebounced, { passive: true });

		requestAnimationFrame(() => {
			refreshComputedTheme();
			observeBaseElementMutationsAndImageLoads();
		});

		routerInstance.afterEach(() => {
			nextTick().then(() => {
				requestAnimationFrame(() => {
					scheduleNavigationRetryThemeRefreshTimers();
					observeBaseElementMutationsAndImageLoads();
				});
			});
		});
	}

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

		clearAllScheduledNavigationRetryTimeouts();

		if (mutationObserverInstance) {
			mutationObserverInstance.disconnect();
			mutationObserverInstance = null;
		}

		for (const registeredListener of registeredImageLoadListeners) {
			registeredListener.imageElement.removeEventListener("load", registeredListener.listener);
		}
		registeredImageLoadListeners.length = 0;

		window.removeEventListener("resize", onWindowResizeDebounced);
	}

	if (options.onThemeChange) {
		watch(
			theme,
			(newTheme) => {
				options.onThemeChange?.(newTheme);
			},
			{ immediate: true }
		);
	}

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
