<script setup lang="ts">
import { ref, nextTick } from "vue";
import gsap from "gsap";

const buildStore = useBuildProjectStore();

const { steps, activeStepIndex, progress, summaryData, isOnLastStep } = storeToRefs(buildStore);

await buildStore.fetchBuildProjectPage();

const containerRef = ref<HTMLElement | null>(null);

async function animateTransition(direction: "next" | "prev", changeStep: () => void) {
	const element = containerRef.value;

	if (!element) {
		changeStep();

		return;
	}

	await gsap.to(element.children, {
		y: direction === "next" ? -16 : 16,
		opacity: 0,
		duration: 0.25,
		ease: "power1.inOut",
		stagger: 0.015,
	});

	changeStep();

	await nextTick();

	gsap.fromTo(
		element.children,
		{ y: direction === "next" ? 16 : -16, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.35, ease: "power2.out", stagger: 0.02 }
	);
}

async function goToNextStep() {
	await animateTransition("next", () => buildStore.nextStep());
}

async function goToPreviousStep() {
	await animateTransition("prev", () => buildStore.previousStep());
}
</script>

<template>
	<section class="py-5xl relative">
		<div class="w-full flex gap-3xl max-w-[1300px] px-md md:px-lg lg:px-2xl py-2xl">
			<div class="flex-1">
				<Progressbar :steps="steps" :activeStepIndex="activeStepIndex" :progress="progress" />

				<h2 class="text-heading-xl font-bold text-black mb-xs">
					{{ steps[activeStepIndex - 1]?.title }}
				</h2>

				<p class="text-black/80 mb-lg text-2xl">
					{{ steps[activeStepIndex - 1]?.description }}
				</p>

				<div ref="containerRef">
					<BuildForm :currentStep="steps[activeStepIndex - 1]" :isOnLastStep="isOnLastStep" />
				</div>

				<div class="flex justify-between items-center pt-xl">
					<Button
						v-if="activeStepIndex > 1"
						@click="goToPreviousStep"
						label="Tillbaka"
						type="button"
						variant="outline"
						reversed />
					<Button
						v-if="!isOnLastStep"
						label="Nästa"
						icon="lucide:arrow-right"
						variant="primary"
						type="button"
						class="ml-auto"
						@click="goToNextStep" />
					<Button
						v-if="isOnLastStep"
						label="Skicka"
						icon="lucide:send"
						variant="primary"
						type="submit"
						class="ml-auto"
						@click="buildStore.submitProjectRequest" />
				</div>
			</div>

			<SummaryPanel :summaryData="summaryData" />
		</div>
	</section>
</template>
