<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watchEffect } from "vue";
import gsap from "gsap";

type StepTransitionDirection = "next" | "prev";

const buildProjectStore = useBuildProjectStore();

const {
	buildProjectSteps,
	activeStepIndex,
	activeStepDefinition,
	progressPercentage,
	isLastStepActive,
	buildProjectPageContent,
	hasSubmittedBuildProjectRequest,
} = storeToRefs(buildProjectStore);

await useAsyncData("build-project-page", () => buildProjectStore.fetchBuildProjectPageIfNeeded(), { server: true });

definePageMeta({ layout: "minimal" });

watchEffect(() => {
	useAppHead(buildProjectPageContent.value?.seo);
});

const pageAnimationScopeElementRef = ref<HTMLElement | null>(null);

const stepTitleElementRef = ref<HTMLElement | null>(null);

const stepDescriptionElementRef = ref<HTMLElement | null>(null);

const stepContentWrapperElementRef = ref<HTMLElement | null>(null);

const navigationWrapperElementRef = ref<HTMLElement | null>(null);

let gsapContext: gsap.Context | undefined;

onMounted(() => {
	if (!import.meta.client) return;

	const scopeElement = pageAnimationScopeElementRef.value;
	if (!scopeElement) return;

	gsapContext = gsap.context(() => {}, scopeElement);
});

onBeforeUnmount(() => {
	gsapContext?.revert();
	gsapContext = undefined;
});

function shakeContainerOnValidationError(): void {
	if (!import.meta.client) return;

	const scopeElement = pageAnimationScopeElementRef.value;
	if (!scopeElement) return;

	gsapContext?.add(() => {
		gsap.fromTo(scopeElement, { x: -6 }, { x: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" });
	});
}

function playTimelineAndWaitForCompletion(timeline: gsap.core.Timeline): Promise<void> {
	return new Promise<void>((resolve) => {
		timeline.eventCallback("onComplete", () => resolve());
		timeline.play();
	});
}

function getStepTransitionElements() {
	return {
		stepTitleElement: stepTitleElementRef.value,
		stepDescriptionElement: stepDescriptionElementRef.value,
		stepContentWrapperElement: stepContentWrapperElementRef.value,
		navigationWrapperElement: navigationWrapperElementRef.value,
	};
}

function createStepTransitionTimeline(direction: StepTransitionDirection, phase: "out" | "in"): gsap.core.Timeline {
	const { stepTitleElement, stepDescriptionElement, stepContentWrapperElement, navigationWrapperElement } =
		getStepTransitionElements();

	const yOut = direction === "next" ? -16 : 16;

	const yIn = direction === "next" ? 16 : -16;

	const elementTimelineEntries = [
		{ element: stepTitleElement, offset: 0.0, duration: phase === "out" ? 0.18 : 0.26 },
		{
			element: stepDescriptionElement,
			offset: phase === "out" ? 0.06 : 0.08,
			duration: phase === "out" ? 0.18 : 0.26,
		},
		{
			element: stepContentWrapperElement,
			offset: phase === "out" ? 0.12 : 0.14,
			duration: phase === "out" ? 0.18 : 0.28,
		},
		{
			element: navigationWrapperElement,
			offset: phase === "out" ? 0.14 : 0.18,
			duration: phase === "out" ? 0.18 : 0.22,
		},
	];

	const timeline = gsap.timeline({ paused: true });

	for (const entry of elementTimelineEntries) {
		if (!entry.element) continue;

		if (phase === "out") {
			timeline.to(
				entry.element,
				{ y: yOut, opacity: 0, duration: entry.duration, ease: "power2.out" },
				entry.offset,
			);
		} else {
			timeline.fromTo(
				entry.element,
				{ y: yIn, opacity: 0 },
				{ y: 0, opacity: 1, duration: entry.duration, ease: "power2.out" },
				entry.offset,
			);
		}
	}

	return timeline;
}

async function animateStepTransition(direction: StepTransitionDirection, commitStepChange: () => void): Promise<void> {
	if (!import.meta.client) {
		commitStepChange();
		return;
	}

	if (!pageAnimationScopeElementRef.value || !gsapContext) {
		commitStepChange();
		return;
	}

	const outTimeline = gsapContext.add(() => createStepTransitionTimeline(direction, "out")) as gsap.core.Timeline;
	await playTimelineAndWaitForCompletion(outTimeline);

	commitStepChange();
	await nextTick();

	const inTimeline = gsapContext.add(() => createStepTransitionTimeline(direction, "in")) as gsap.core.Timeline;
	await playTimelineAndWaitForCompletion(inTimeline);
}

async function handleNextStepRequest(): Promise<void> {
	const isActiveStepValid = buildProjectStore.validateActiveStepFields();

	if (!isActiveStepValid) {
		shakeContainerOnValidationError();
		return;
	}

	await animateStepTransition("next", () => buildProjectStore.goToNextStep());
}

async function handlePreviousStepRequest(): Promise<void> {
	await animateStepTransition("prev", () => buildProjectStore.goToPreviousStep());
}

async function handleBuildProjectSubmissionRequest(): Promise<void> {
	const isActiveStepValid = buildProjectStore.validateActiveStepFields();

	if (!isActiveStepValid) {
		shakeContainerOnValidationError();
		return;
	}

	await buildProjectStore.submitBuildProjectRequest();
}
</script>

<template>
	<section class="relative pb-2xl lg:pb-4xl pt-3xl lg:pt-5xl min-h-screen">
		<SuccessMessage v-if="hasSubmittedBuildProjectRequest" />

		<div
			v-else
			class="mx-auto w-full max-w-[1300px] px-lg lg:px-2xl pt-3xl xl:flex max-xl:space-y-3xl xl:space-x-3xl lg:mt-2xl">
			<div class="flex-1 xl:min-w-[850px]">
				<Progressbar
					:steps="buildProjectSteps"
					:active-step-index="activeStepIndex"
					:progress="progressPercentage" />

				<div ref="pageAnimationScopeElementRef" class="mt-2xl xl:mt-4xl">
					<div class="mb:xl xl:mb-3xl">
						<h1
							ref="stepTitleElementRef"
							class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl xl:text-heading-2xl mb-lg max-w-[850px]">
							{{ activeStepDefinition?.title }}
						</h1>

						<p
							ref="stepDescriptionElementRef"
							class="text-black/80 mb-xl text-lg lg:text-2xl xl:text-3xl max-w-[850px]">
							{{ activeStepDefinition?.description }}
						</p>
					</div>

					<div ref="stepContentWrapperElementRef">
						<StepRenderer :step="activeStepDefinition" :is-last-step="isLastStepActive" />
					</div>

					<div ref="navigationWrapperElementRef">
						<BuildNavigation
							:index="activeStepIndex"
							:last="isLastStepActive"
							@next="handleNextStepRequest"
							@prev="handlePreviousStepRequest"
							@submit="handleBuildProjectSubmissionRequest" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
