<script setup lang="ts">
const buildProjectStore = useBuildProjectStore();

const { buildProject, currentOffer, selectedSubIds } = storeToRefs(buildProjectStore);

await useAsyncData("buildProject", () => buildProjectStore.fetchBuildProject(), { server: true });

definePageMeta({
	layout: "minimal",
});

const currentStep = ref(1);

const formData = ref({ summary: "" });

function nextStep() {
	if (buildProject.value && currentStep.value < (buildProject.value.steps.length || 4)) {
		currentStep.value++;
	}
}

function prevStep() {
	if (currentStep.value > 1) {
		currentStep.value--;
	}
}
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl pt-2xl">
			<Heading
				:title="buildProject?.title"
				align_content="start"
				class="mb-xl"
				:description="buildProject?.description" />

			<div class="grid grid-cols-5 gap-2xl items-start">
				<div class="col-span-3 space-y-2xl">
					<StepProgress
						:progress="(currentStep / (buildProject?.steps?.length || 4)) * 100"
						:steps="buildProject?.steps"
						:current-step="currentStep"
						class="mb-xl" />

					<AddonSelect
						v-if="currentStep === 2"
						:subservices="buildProject?.subservices"
						:current-offer="currentOffer"
						:selected-ids="selectedSubIds" />

					<div v-if="currentStep === 3" class="space-y-md">
						<h2 class="text-heading-md font-bold">3. Sammanfattning</h2>
						<Textarea
							v-model="formData.summary"
							placeholder="Berätta om ditt projekt…"
							rows="6"
							class="w-full rounded-xl border border-light/30 shadow-sm bg-light/10 p-md focus:border-primary transition" />
					</div>

					<StepConfirm v-if="currentStep === 4" :current-offer="currentOffer" />

					<div class="flex justify-between items-center pt-xl border-t border-light/20">
						<Button variant="outline" label="Tillbaka" icon="lucide:arrow-left" @click="prevStep" />

						<Button
							v-if="currentStep < (buildProject?.steps?.length || 4)"
							:disabled="currentStep === 1 && !currentOffer"
							variant="primary"
							label="Nästa"
							icon="lucide:arrow-right"
							class="ml-auto"
							@click="nextStep" />

						<Button v-else variant="primary" label="Skicka" icon="ucide:send" class="ml-auto" />
					</div>
				</div>

				<div
					class="sticky top-24 p-xl rounded-2xl border border-light/20 bg-light/10 shadow-lg backdrop-blur col-span-2">
					<h3 class="text-heading-md font-bold mb-lg">Sammanfattning</h3>
					<ul class="space-y-md text-dark-gray">
						<li><strong>Beskrivning:</strong></li>
						<li>
							<strong>Tillägg:</strong>
							<ul class="mt-1 space-y-1"></ul>
						</li>
					</ul>
					<div class="mt-xl border-t pt-lg space-y-xs">
						<p class="text-heading-sm font-semibold">Engångskostnad: TOTAL kr</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
