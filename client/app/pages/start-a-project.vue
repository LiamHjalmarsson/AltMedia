<script setup lang="ts">
import gsap from "gsap";
const store = useBuildProjectStore();

const { steps, currentStepIndex, activeStep, progressPercent, isLastStep, page, loading, isSubmitted } =
	storeToRefs(store);

await useAsyncData("build-project-page", () => store.fetchBuildProjectPage(), { server: true });

definePageMeta({ layout: "minimal" });

useAppHead(page.value?.seo);

const containerRef = ref<HTMLElement | null>(null);

async function onNext() {
	if (!store.validateCurrentStep()) return animateError();

	await animateStep("next", store.nextStep);
}

async function handlePrev() {
	await animateStep("prev", () => store.previousStep());
}

async function handleSubmit() {
	if (!store.validateCurrentStep()) return animateError();

	await store.submitProjectRequest();
}

function animateError() {
	const container = containerRef.value;

	if (!container) return;

	gsap.fromTo(container, { x: -6 }, { x: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" });
}

async function animateStep(direction: "next" | "prev", action: () => void) {
	const container = containerRef.value;

	if (!container) return action();

	await gsap.to(container.children, {
		y: direction === "next" ? -16 : 16,
		opacity: 0,
		duration: 0.22,
		stagger: 0.015,
		ease: "power2.out",
	});

	action();

	await nextTick();

	gsap.fromTo(
		container.children,
		{ y: direction === "next" ? 16 : -16, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.32, stagger: 0.02 },
	);
}
</script>

<template>
	<section class="relative pt-5xl min-h-screen">
		<SuccessMessage v-if="isSubmitted" />

		<div class="mx-auto max-w-[1300px] px-md md:px-lg lg:px-2xl pt-3xl xl:flex max-xl:space-y-3xl xl:space-x-3xl">
			<div class="flex-1 xl:min-w-[850px]">
				<Progressbar :steps="steps" :active-step-index="currentStepIndex" :progress="progressPercent" />

				<h1 class="font-bold mb-md text-heading-lg lg:text-heading-xl xl:text-heading-2xl">
					{{ activeStep?.title }}
				</h1>

				<p class="text-black/80 mb-lg text-lg lg:text-2xl">
					{{ activeStep?.description }}
				</p>

				<div ref="containerRef" class="min-h-[400px]">
					<StepRenderer :step="activeStep" :is-last-step="isLastStep" />
				</div>

				<BuildNavigation
					:index="currentStepIndex"
					:last="isLastStep"
					@next="onNext"
					@prev="handlePrev"
					@submit="handleSubmit" />
			</div>
		</div>
	</section>
</template>
