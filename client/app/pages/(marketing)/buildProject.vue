<script setup lang="ts">
import { ref, nextTick } from "vue";
import gsap from "gsap";

const store = useBuildProjectStore();

const { steps, activeStepIndex, progress, isOnLastStep, summaryData, page } = storeToRefs(store);

await useAsyncData("build-project-page", () => store.fetchBuildProjectPage(), { server: true });

definePageMeta({ layout: "minimal" });

useAppHead(page.value?.seo || undefined);

const containerRef = ref<HTMLElement | null>(null);

async function animate(direction: "next" | "prev", stepFn: () => void) {
	const element = containerRef.value;

	if (!element) return stepFn();

	await gsap.to(element.children, {
		y: direction === "next" ? -16 : 16,
		opacity: 0,
		duration: 0.25,
		stagger: 0.015,
	});

	stepFn();

	await nextTick();

	gsap.fromTo(
		element.children,
		{ y: direction === "next" ? 16 : -16, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.35, stagger: 0.02 }
	);
}
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl pt-3xl xl:flex max-xl:space-y-3xl xl:space-x-3xl">
			<div class="flex-1 min-w-[850px]">
				<Progressbar :steps="steps" :activeStepIndex="activeStepIndex" :progress="progress" />

				<h2 class="text-heading-xl font-bold mb-xs">{{ steps[activeStepIndex - 1]?.title }}</h2>
				<p class="text-black/80 mb-lg text-2xl">{{ steps[activeStepIndex - 1]?.description }}</p>

				<div ref="containerRef" class="min-h-[400px]">
					<BuildForm
						:currentStep="steps[activeStepIndex - 1]"
						:isOnLastStep="isOnLastStep"
						:key="activeStepIndex" />
				</div>

				<div class="flex justify-between items-center pt-xl">
					<Button
						v-if="activeStepIndex > 1"
						@click="animate('prev', store.previousStep)"
						label="Tillbaka"
						type="button"
						reversed
						variant="outline" />
					<Button
						v-if="!isOnLastStep"
						label="Nästa"
						icon="lucide:arrow-right"
						variant="primary"
						@click="animate('next', store.nextStep)"
						type="button"
						class="ml-auto" />
					<Button
						v-if="isOnLastStep"
						label="Skicka"
						icon="lucide:send"
						variant="primary"
						@click="store.submitProjectRequest"
						type="submit"
						class="ml-auto" />
				</div>
			</div>

			<SummaryPanel v-if="page?.settings?.show_summary_panel" :summaryData="summaryData" />
		</div>
	</section>
</template>
