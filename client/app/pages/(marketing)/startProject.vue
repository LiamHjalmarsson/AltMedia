<script setup lang="ts">
const buildProjectStore = useBuildProjectStore();

const { buildProject, currentOffer, selectedSubs, totalOnce, totalMonthly, selectedSubIds, loading } =
	storeToRefs(buildProjectStore);

await useAsyncData("buildProject", () => buildProjectStore.fetchBuildProject(), { server: true });

definePageMeta({
	layout: "custom",
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
	<Section>
		<Container>
			<div class="my-2xl text-center max-w-2xl mx-auto">
				<Heading :title="buildProject?.title" align_content="center" />
				<p class="text-base text-dark-gray mt-sm">{{ buildProject?.description }}</p>
			</div>

			<Grid class="grid-cols-3 gap-2xl items-start">
				<div class="col-span-2 space-y-2xl pr-2xl">
					<StepProgress
						:progress="(currentStep / (buildProject?.steps?.length || 4)) * 100"
						:steps="buildProject?.steps"
						:current-step="currentStep"
						class="mb-xl" />

					<OfferSelect
						v-if="currentStep === 1"
						:offers="buildProject?.offers"
						:current-offer-id="currentOffer?.id"
						@select="buildProjectStore.setCurrentOffer" />

					<AddonSelect
						v-if="currentStep === 2"
						:subservices="buildProject?.subservices"
						:current-offer="currentOffer"
						:selected-ids="selectedSubIds"
						@toggle="buildProjectStore.toggleSub" />

					<div v-if="currentStep === 3" class="space-y-md">
						<h2 class="text-heading-md font-bold">3. Sammanfattning</h2>
						<Textarea
							v-model="formData.summary"
							placeholder="Berätta om ditt projekt…"
							rows="6"
							class="w-full rounded-xl border border-light/30 shadow-sm bg-light/10 p-md focus:border-primary transition" />
					</div>

					<StepConfirm
						v-if="currentStep === 4"
						:current-offer="currentOffer"
						:selected-subs="selectedSubs"
						:total-once="totalOnce"
						:total-monthly="totalMonthly" />

					<div class="flex justify-between items-center pt-xl border-t border-light/20">
						<button
							type="button"
							class="inline-flex items-center justify-center gap-sm px-lg py-sm rounded-xl font-semibold border transition border-primary text-primary bg-transparent hover:bg-primary/10 focus:ring-2 focus:ring-primary/50">
							<Icon name="lucide:arrow-left" size="18" />
							<span><slot>Tillbaka</slot></span>
						</button>

						<Button
							v-if="currentStep < (buildProject?.steps?.length || 4)"
							:disabled="currentStep === 1 && !currentOffer"
							variant="primary"
							class="ml-auto"
							@click="nextStep">
							Nästa
							<Icon name="lucide:arrow-right" size="18" class="ml-xs" />
						</Button>
						<Button v-else variant="primary" class="ml-auto">
							Skicka
							<Icon name="lucide:send" size="18" class="ml-xs" />
						</Button>
					</div>
				</div>

				<SummarySidebar
					:current-offer="currentOffer"
					:selected-subs="selectedSubs"
					:summary="formData.summary"
					:total-once="totalOnce"
					:total-monthly="totalMonthly" />
			</Grid>
		</Container>
	</Section>
</template>
