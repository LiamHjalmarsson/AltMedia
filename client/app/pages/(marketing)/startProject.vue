<script setup lang="ts">
const startProjectStore = useStartProjectStore();

const { startProject } = storeToRefs(startProjectStore);

await useAsyncData("startProject", () => startProjectStore.fetchStartProject(), { server: true });

const currentStep = ref(1);

const formData = ref({ summary: "" });

const selectedSubIds = ref<Set<number>>(new Set());

const currentOffer = ref<any | null>(null);

const steps = computed(() => startProject.value?.steps || []);

const offers = computed(() => startProject.value?.offers || []);

const subservices = computed(() => startProject.value?.subservices || []);

const progress = computed(() => (steps.value.length ? (currentStep.value / steps.value.length) * 100 : 0));

function selectOffer(offer: any) {
	currentOffer.value = offer;

	selectedSubIds.value = new Set((offer.subservices || []).map((s: any) => s.id));
}

function toggleSub(sub: any) {
	if (currentOffer.value?.subservices?.some((s: any) => s.id === sub.id)) {
		return;
	}

	const next = new Set(selectedSubIds.value);

	next.has(sub.id) ? next.delete(sub.id) : next.add(sub.id);

	selectedSubIds.value = next;
}

const selectedSubs = computed(() => subservices.value.filter((s: any) => selectedSubIds.value.has(s.id)));

const totalOnce = computed(() => {
	const base = currentOffer.value?.start_price || 0;

	const add = selectedSubs.value.reduce(
		(sum, s) =>
			sum + (currentOffer.value?.subservices?.some((inc: any) => inc.id === s.id) ? 0 : s.price_once || 0),
		0
	);
	return base + add;
});

const totalMonthly = computed(() => {
	const base = currentOffer.value?.month_price || 0;

	const add = selectedSubs.value.reduce(
		(sum, s) =>
			sum + (currentOffer.value?.subservices?.some((inc: any) => inc.id === s.id) ? 0 : s.price_month || 0),
		0
	);
	return base + add;
});

function nextStep() {
	if (currentStep.value < (steps.value.length || 4)) currentStep.value++;
}

function prevStep() {
	if (currentStep.value > 1) currentStep.value--;
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
					<StepProgress :progress="progress" :steps="steps" :current-step="currentStep" class="mb-xl" />

					<OfferSelect
						v-if="currentStep === 1"
						:offers="offers"
						:current-offer-id="currentOffer?.id"
						@select="selectOffer" />

					<AddonSelect
						v-if="currentStep === 2"
						:subservices="subservices"
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

					<div v-if="currentStep === 4" class="space-y-lg">
						<h2 class="text-heading-md font-bold">4. Bekräfta & skicka</h2>
						<Card class="p-xl rounded-2xl border border-light/20 shadow-md space-y-md">
							<ul class="space-y-sm text-dark-gray">
								<li><b>Paket:</b> {{ currentOffer?.title || "Ej valt" }}</li>
								<li><b>Antal tillägg:</b> {{ selectedSubs.length }}</li>
								<li><b>Engångskostnad:</b> {{ totalOnce }} kr</li>
								<li v-if="totalMonthly"><b>Månadskostnad:</b> {{ totalMonthly }} kr/mån</li>
							</ul>
							<p class="mt-md text-sm text-dark-gray">Skicka din förfrågan, vi återkommer inom 24h.</p>
						</Card>
					</div>

					<div class="flex justify-between items-center pt-xl border-t border-light/20">
						<Button v-if="currentStep > 1" variant="ghost" @click="prevStep">Tillbaka</Button>
						<Button
							v-if="currentStep < (steps?.length || 4)"
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
