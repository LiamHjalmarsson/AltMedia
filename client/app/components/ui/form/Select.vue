<script setup lang="ts">
import { ref, computed } from "vue";

const steps = [
	{ id: 1, title: "Välj projekt typ" },
	{ id: 2, title: "Beskriv projektet" },
	{ id: 3, title: "Välj tillägg" },
	{ id: 4, title: "Bekräfta & pris" },
];

const currentStep = ref(1);

const progress = computed(() => (currentStep.value / steps.length) * 100);

const formData = ref({
	projectType: null as string | null,
	summary: "",
	extras: [] as string[],
	totalPrice: 0,
});

function nextStep() {
	if (currentStep.value < steps.length) currentStep.value++;
}

function prevStep() {
	if (currentStep.value > 1) currentStep.value--;
}

function submitForm() {}
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<div class="mb-xl text-center">
				<Heading title="Starta ett projekt" align_content="center" />
				<p class="text-lg text-dark-gray mt-sm">
					Fyll i stegen nedan och se en offert med prisförslag i realtid.
				</p>
			</div>

			<div class="w-full h-2 rounded-full bg-light/20 mb-2xl overflow-hidden">
				<div
					class="h-2 bg-gradient-to-r from-primary to-secondary transition-all duration-500"
					:style="{ width: progress + '%' }" />
			</div>

			<div class="grid grid-cols-3 gap-2xl items-start">
				<div class="col-span-2 space-y-2xl">
					<div
						v-if="currentStep === 1"
						class="p-xl rounded-2xl border border-light/20 bg-light shadow-md space-y-lg">
						<h2 class="text-heading-md font-bold">1. Välj projekt typ</h2>
						<div class="grid grid-cols-2 gap-lg">
							<button
								v-for="type in ['Webbplats', 'E-handel', 'Branding', 'Annat']"
								:key="type"
								@click="formData.projectType = type"
								:class="[
									'p-lg rounded-xl border text-center transition cursor-pointer font-semibold',
									formData.projectType === type
										? 'border-primary bg-primary/10 text-primary'
										: 'border-light/20 hover:border-primary/60',
								]">
								{{ type }}
							</button>
						</div>
					</div>

					<div
						v-if="currentStep === 2"
						class="p-xl rounded-2xl border border-light/20 bg-light shadow-md space-y-lg">
						<h2 class="text-heading-md font-bold">2. Beskriv projektet</h2>
						<Textarea
							v-model="formData.summary"
							placeholder="Berätta om ditt projekt: mål, funktioner, innehåll..."
							rows="6"
							class="w-full" />
					</div>

					<div
						v-if="currentStep === 3"
						class="p-xl rounded-2xl border border-light/20 bg-light shadow-md space-y-lg">
						<h2 class="text-heading-md font-bold">3. Välj tillägg</h2>
						<div class="grid grid-cols-2 gap-md">
							<label
								v-for="extra in ['SEO-optimering', 'Supportpaket', 'Hosting', 'Contentproduktion']"
								:key="extra"
								class="flex items-center gap-sm p-md border rounded-lg cursor-pointer transition hover:border-primary/60">
								<input type="checkbox" :value="extra" v-model="formData.extras" />
								<span>{{ extra }}</span>
							</label>
						</div>
					</div>

					<div
						v-if="currentStep === 4"
						class="p-xl rounded-2xl border border-light/20 bg-light shadow-md space-y-lg">
						<h2 class="text-heading-md font-bold">4. Bekräfta & skicka</h2>
						<p>
							Granska detaljerna i sammanfattningen till höger. Klicka på
							<b>Skicka</b> för att skicka in din förfrågan.
						</p>
					</div>

					<div class="flex justify-between items-center pt-lg">
						<Button
							v-if="currentStep > 1"
							type="button"
							variant="ghost"
							label="Tillbaka"
							@click="prevStep" />

						<Button
							v-if="currentStep < steps.length"
							variant="primary"
							label="Nästa"
							type="button"
							class="ml-auto"
							@click="nextStep" />

						<Button
							v-else
							variant="primary"
							label="Skicka"
							type="submit"
							class="ml-auto"
							@click="submitForm" />
					</div>
				</div>

				<aside class="sticky top-24 p-xl rounded-2xl border border-light/20 bg-light shadow-lg space-y-lg">
					<h3 class="text-heading-md font-bold">Sammanfattning</h3>

					<div class="space-y-sm text-dark-gray">
						<p>
							<strong>Projekt typ:</strong>
							<span>{{ formData.projectType || "Ej valt" }}</span>
						</p>
						<p>
							<strong>Beskrivning:</strong>
							<span>{{ formData.summary || "Ej ifyllt" }}</span>
						</p>
						<p>
							<strong>Tillägg:</strong>
							<span v-if="formData.extras.length">
								{{ formData.extras.join(", ") }}
							</span>
							<span v-else>Inga valda</span>
						</p>
					</div>

					<div class="border-t border-light/20 pt-lg">
						<p class="text-heading-md font-bold text-primary">Totalpris: {{ formData.totalPrice }} SEK</p>
					</div>
				</aside>
			</div>
		</div>
	</section>
</template>
