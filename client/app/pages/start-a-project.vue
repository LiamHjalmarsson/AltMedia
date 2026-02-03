<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

const store = useBuildProjectStore();

const { steps, currentStepIndex, activeStep, progressPercent, isLastStep, page, loading, isSubmitted } =
	storeToRefs(store);

await useAsyncData("build-project-page", () => store.fetchBuildProjectPage(), { server: true });

definePageMeta({ layout: "minimal" });

useAppHead(page.value?.seo);

const containerRef = ref<HTMLElement | null>(null);

// Animate refs only (no children / querySelector)
const titleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const stepWrapRef = ref<HTMLElement | null>(null);
const navWrapRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | undefined;

onMounted(() => {
	if (!import.meta.client) return;
	if (!containerRef.value) return;

	// scope all tweens/timelines to this component instance
	ctx = gsap.context(() => {}, containerRef);
});

onBeforeUnmount(() => {
	ctx?.revert();
	ctx = undefined;
});

function animateError() {
	if (!import.meta.client) return;

	const el = containerRef.value;
	if (!el) return;

	// keep it scoped
	ctx?.add(() => {
		gsap.fromTo(el, { x: -6 }, { x: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" });
	});
}

function play(tl: gsap.core.Timeline) {
	return new Promise<void>((resolve) => {
		tl.eventCallback("onComplete", () => resolve());
	});
}

function getEls() {
	// filter nulls and keep stable order
	return {
		title: titleRef.value,
		desc: descRef.value,
		step: stepWrapRef.value,
		nav: navWrapRef.value,
	};
}

async function animateStep(direction: "next" | "prev", action: () => void) {
	if (!import.meta.client) return action();

	const scopeEl = containerRef.value;
	if (!scopeEl) return action();

	const { title, desc, step, nav } = getEls();
	const yOut = direction === "next" ? -16 : 16;
	const yIn = direction === "next" ? 16 : -16;

	// OUT sequence (custom timing per element)
	const outTl = gsap.timeline({ paused: true });

	ctx?.add(() => {
		if (title) outTl.to(title, { y: yOut, opacity: 0, duration: 0.18, ease: "power2.out" }, 0);
		if (desc) outTl.to(desc, { y: yOut, opacity: 0, duration: 0.18, ease: "power2.out" }, 0.06);
		if (step) outTl.to(step, { y: yOut, opacity: 0, duration: 0.18, ease: "power2.out" }, 0.12);
		if (nav) outTl.to(nav, { y: yOut, opacity: 0, duration: 0.18, ease: "power2.out" }, 0.14);
	});

	outTl.play();
	await play(outTl);

	action();
	await nextTick();

	// IN sequence (different timing per element)
	const inTl = gsap.timeline({ paused: true });

	ctx?.add(() => {
		if (title)
			inTl.fromTo(title, { y: yIn, opacity: 0 }, { y: 0, opacity: 1, duration: 0.26, ease: "power2.out" }, 0);

		if (desc)
			inTl.fromTo(desc, { y: yIn, opacity: 0 }, { y: 0, opacity: 1, duration: 0.26, ease: "power2.out" }, 0.08);

		if (step)
			inTl.fromTo(step, { y: yIn, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" }, 0.14);

		if (nav)
			inTl.fromTo(nav, { y: yIn, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, 0.18);
	});

	inTl.play();

	await play(inTl);
}

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
</script>

<template>
	<section class="relative pb-2xl lg:pb-4xl pt-3xl lg:pt-5xl min-h-screen">
		<SuccessMessage v-if="isSubmitted" />

		<div
			class="mx-auto w-full max-w-[1300px] px-lg lg:px-2xl pt-3xl xl:flex max-xl:space-y-3xl xl:space-x-3xl mt-2xl">
			<div class="flex-1 xl:min-w-[850px]">
				<Progressbar :steps="steps" :active-step-index="currentStepIndex" :progress="progressPercent" />

				<div ref="containerRef" class="mt-2xl xl:mt-4xl">
					<div class="mb:xl xl:mb-3xl">
						<h1
							ref="titleRef"
							class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl xl:text-heading-2xl mb-lg font-extrabold max-w-[850px]">
							{{ activeStep?.title }}
						</h1>

						<p ref="descRef" class="text-black/80 mb-xl text-lg lg:text-2xl xl:text-3xl max-w-[850px]">
							{{ activeStep?.description }}
						</p>
					</div>

					<div ref="stepWrapRef">
						<StepRenderer :step="activeStep" :is-last-step="isLastStep" />
					</div>

					<div ref="navWrapRef">
						<BuildNavigation
							:index="currentStepIndex"
							:last="isLastStep"
							@next="onNext"
							@prev="handlePrev"
							@submit="handleSubmit" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
