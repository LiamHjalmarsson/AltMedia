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
const forcedHeaderThemeRef = ref<Theme | null>(null);

export function useAutoHeaderContrast(
	headerElementReference: Ref<HTMLElement | null>,
	options: AutoHeaderContrastOptions = {},
) {
	const detectedHeaderThemeRef = ref<Theme>("dark");

	const router = useRouter();

	const debounceMilliseconds = options.debounceMilliseconds ?? DEFAULT_DEBOUNCE_MILLISECONDS;

	let scrollTriggerInstance: ScrollTrigger | null = null;

	let resizeDebounceTimerIdentifier: number | null = null;

	let mutationDebounceTimerIdentifier: number | null = null;

	let mutationObserverInstance: MutationObserver | null = null;

	const navigationRetryTimeoutIdentifiers: number[] = [];

	const registeredImageLoadListeners: Array<{ imageElement: HTMLImageElement; listener: EventListener }> = [];

	const theme = computed(() => forcedHeaderThemeRef.value ?? detectedHeaderThemeRef.value);

	function calculateMedianOfNumberArray(numbers: number[]): number | undefined {
		if (!numbers.length) return undefined;

		const sortedAscending = [...numbers].sort((firstValue, secondValue) => firstValue - secondValue);

		const medianIndex = Math.floor(sortedAscending.length / 2);

		return sortedAscending[medianIndex];
	}

	function getEffectiveBackgroundColor(startElement: HTMLElement | null): string {
		let current = startElement;

		while (current) {
			const backgroundColor = getComputedStyle(current).backgroundColor;

			if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") {
				return backgroundColor;
			}

			current = current.parentElement;
		}

		return getComputedStyle(document.body).backgroundColor || "#f9fafa";
	}

	function resolveBackgroundBaseElement(): HTMLElement {
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

	function findNearestHeaderThemeOverride(startElement: HTMLElement | null): Theme | null {
		let current: HTMLElement | null = startElement;

		while (current) {
			const override = current.getAttribute("data-header-theme");
			if (override === "light" || override === "dark") return override;

			current = current.parentElement;
		}

		return null;
	}

	function sampleBackgroundLuminanceAtPoints(
		viewportPoints: [number, number][],
		headerElement: HTMLElement,
	): number[] {
		const previousPointerEventsValue = headerElement.style.pointerEvents;

		headerElement.style.pointerEvents = "none";

		const luminanceValues: number[] = [];

		try {
			for (const [sampleX, sampleY] of viewportPoints) {
				const elementAtPoint = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;

				if (!elementAtPoint) continue;

				const backgroundColor = getEffectiveBackgroundColor(elementAtPoint);

				const luminanceValue = colord(backgroundColor).luminance();

				luminanceValues.push(luminanceValue);
			}
		} finally {
			headerElement.style.pointerEvents = previousPointerEventsValue;
		}

		return luminanceValues;
	}

	function detectThemeFromBaseBackground(): void {
		const baseElementToSample = resolveBackgroundBaseElement();

		const overrideTheme = findNearestHeaderThemeOverride(baseElementToSample);

		if (overrideTheme) {
			detectedHeaderThemeRef.value = overrideTheme;
			return;
		}

		const resolvedBaseBackgroundColor = getEffectiveBackgroundColor(baseElementToSample);

		const baseLuminanceValue = colord(resolvedBaseBackgroundColor).luminance();

		detectedHeaderThemeRef.value = baseLuminanceValue < LUMINANCE_THRESHOLD ? "dark" : "light";
	}

	function detectThemeFromElementsBehindHeader(): void {
		const headerElement = headerElementReference.value;

		if (!headerElement) return;

		const headerBoundingRectangle = headerElement.getBoundingClientRect();

		const samplingPoints = generateHeaderSamplingPoints(headerBoundingRectangle, 5);

		const previousPointerEventsValue = headerElement.style.pointerEvents;

		headerElement.style.pointerEvents = "none";

		try {
			for (const [sampleX, sampleY] of samplingPoints) {
				const elementAtPoint = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;

				if (!elementAtPoint) continue;

				const overrideTheme = findNearestHeaderThemeOverride(elementAtPoint);

				if (overrideTheme) {
					detectedHeaderThemeRef.value = overrideTheme;

					return;
				}
			}

			const luminanceSampleValues = sampleBackgroundLuminanceAtPoints(samplingPoints, headerElement);

			const medianLuminanceValue = calculateMedianOfNumberArray(luminanceSampleValues);

			if (medianLuminanceValue !== undefined) {
				detectedHeaderThemeRef.value = medianLuminanceValue < LUMINANCE_THRESHOLD ? "dark" : "light";
			}
		} finally {
			headerElement.style.pointerEvents = previousPointerEventsValue;
		}
	}

	function refreshComputedTheme(): void {
		detectThemeFromBaseBackground();
		detectThemeFromElementsBehindHeader();
		ScrollTrigger.refresh();
	}

	function clearAllScheduledNavigationRetryTimeouts(): void {
		for (const retryTimeoutIdentifier of navigationRetryTimeoutIdentifiers) {
			clearTimeout(retryTimeoutIdentifier);
		}

		navigationRetryTimeoutIdentifiers.length = 0;
	}

	function scheduleRouteChangeThemeRetries(): void {
		clearAllScheduledNavigationRetryTimeouts();

		for (const retryDelayMilliseconds of NAVIGATION_RETRY_DELAYS_MILLISECONDS) {
			const newTimeoutIdentifier = window.setTimeout(() => {
				refreshComputedTheme();
			}, retryDelayMilliseconds);

			navigationRetryTimeoutIdentifiers.push(newTimeoutIdentifier);
		}
	}

	function stopListeningToImageLoads(): void {
		for (const registeredListener of registeredImageLoadListeners) {
			registeredListener.imageElement.removeEventListener("load", registeredListener.listener);
		}

		registeredImageLoadListeners.length = 0;
	}

	function observeBaseElementMutationsAndImageLoads(): void {
		if (mutationObserverInstance) {
			mutationObserverInstance.disconnect();

			mutationObserverInstance = null;
		}

		stopListeningToImageLoads();

		const baseElementToObserve = resolveBackgroundBaseElement();

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
			onUpdate: detectThemeFromElementsBehindHeader,
			onRefresh: detectThemeFromElementsBehindHeader,
		});

		window.addEventListener("resize", onWindowResizeDebounced, { passive: true });

		requestAnimationFrame(() => {
			refreshComputedTheme();

			observeBaseElementMutationsAndImageLoads();
		});

		router.afterEach(() => {
			nextTick().then(() => {
				requestAnimationFrame(() => {
					scheduleRouteChangeThemeRetries();

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

		stopListeningToImageLoads();

		window.removeEventListener("resize", onWindowResizeDebounced);
	}

	if (options.onThemeChange) {
		watch(
			theme,
			(newTheme) => {
				options.onThemeChange?.(newTheme);
			},
			{ immediate: true },
		);
	}

	return {
		theme,
		force: (value: Theme | null) => {
			forcedHeaderThemeRef.value = value;
		},
		init: initializeAutoHeaderContrast,
		destroy: destroyAutoHeaderContrast,
		refresh: refreshComputedTheme,
	};
}
