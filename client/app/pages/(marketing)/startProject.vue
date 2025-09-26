<script setup lang="ts">
import type { Offer, Subservice } from "~/types/content/collections";

const startProjectStore = useStartProjectStore();

const { startProject } = storeToRefs(startProjectStore);

await useAsyncData("startProject", () => startProjectStore.fetchStartProject(), { server: true });

const currentStep = ref(1);

const formData = ref({ summary: "" });

const selectedSubIds = ref<Set<number>>(new Set());

const currentOffer = ref<Offer | null>(null);

const progress = computed(() =>
	startProject.value?.steps.length ? (currentStep.value / startProject.value?.steps.length) * 100 : 0
);

function selectOffer(offer: Offer) {
	currentOffer.value = offer;

	selectedSubIds.value = new Set((offer.subservices || []).map((subservice: Subservice) => subservice.id));
}

function toggleSub(subservice: Subservice) {
	if (currentOffer.value?.subservices?.some((sub: Subservice) => sub.id === subservice.id)) {
		return;
	}

	const next = new Set(selectedSubIds.value);

	next.has(subservice.id) ? next.delete(subservice.id) : next.add(subservice.id);

	selectedSubIds.value = next;
}

const selectedSubs = computed(
	() =>
		startProject.value?.subservices?.filter((subservice: Subservice) => selectedSubIds.value.has(subservice.id)) ||
		[]
);

const totalOnce = computed(() => {
	const base = currentOffer.value?.start_price || 0;

	const add = selectedSubs.value.reduce(
		(sum, subservice) =>
			sum +
			(currentOffer.value?.subservices?.some((inc: Subservice) => inc.id === subservice.id)
				? 0
				: subservice.price_once || 0),
		0
	);
	return base + add;
});

const totalMonthly = computed(() => {
	const base = currentOffer.value?.month_price || 0;

	const add = selectedSubs.value.reduce(
		(sum, subservice) =>
			sum +
			(currentOffer.value?.subservices?.some((inc: Subservice) => inc.id === subservice.id)
				? 0
				: subservice.price_month || 0),
		0
	);

	return base + add;
});

function nextStep() {
	if (startProject.value && currentStep.value < (startProject.value.steps.length || 4)) {
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
			<div class="my-xxl text-center max-w-2xl mx-auto">
				<Heading :title="startProject?.title" align_content="center" />
				<p class="text-base text-dark-gray mt-sm">
					{{ startProject?.description }}
				</p>
			</div>

			<Grid class="grid-cols-3 gap-xxl items-start">
				<div class="col-span-2 space-y-2xl pr-xxl">
					<StepProgress
						:progress="progress"
						:steps="startProject?.steps"
						:current-step="currentStep"
						class="mb-xl" />

					<OfferSelect
						v-if="currentStep === 1"
						:offers="startProject?.offers"
						:current-offer-id="currentOffer?.id"
						@select="selectOffer" />

					<AddonSelect
						v-if="currentStep === 2"
						:subservices="startProject?.subservices"
						:current-offer="currentOffer"
						:selected-ids="selectedSubIds"
						@toggle="toggleSub" />

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
						<Button v-if="currentStep > 1" variant="ghost" @click="prevStep">Tillbaka</Button>
						<Button
							v-if="currentStep < (startProject?.steps?.length || 4)"
							:disabled="currentStep === 1 && !currentOffer"
							variant="primary"
							class="ml-auto"
							@click="nextStep">
							Nästa
						</Button>
						<Button v-else variant="primary" class="ml-auto">Skicka</Button>
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
