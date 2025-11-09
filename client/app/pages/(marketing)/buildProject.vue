<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import gsap from "gsap";
import type { BuildProjectPage, Step } from "~/types";

const { findOne, create } = useStrapi();

const steps = ref<Step[]>([]);
const currentStep = ref(1);
const formData = ref<Record<string, any>>({});
const containerRef = ref<HTMLElement | null>(null);

const totalSteps = computed(() => steps.value.length);
const progress = computed(() => (currentStep.value / totalSteps.value) * 100);
const isLastStep = computed(() => currentStep.value === totalSteps.value);

const filteredSummary = computed(() => {
	const excluded = ["Namn", "E-post", "Telefonnummer"];
	const result: Record<string, any> = {};
	for (const key in formData.value) {
		if (!excluded.includes(key)) result[key] = formData.value[key];
	}
	return result;
});

onMounted(async () => {
	const { data } = await findOne<BuildProjectPage>("build-project-page");

	if (!data) return;

	const rawSteps = data?.steps || [];

	steps.value = rawSteps.map((step: any) => {
		const s: Step = {
			title: step.title,
			description: step.description,
			questions: step.questions || [],
			related_services: step.related_services || [],
			related_subservices: step.related_subservices || [],
		};

		s.questions.forEach((q) => {
			if (q.type === "multi" || q.type === "static") {
				const services = s.related_services?.map((srv) => srv.title) || [];
				const subs = s.related_subservices?.map((sub) => sub.title) || [];
				q.options = [...services, ...subs];
			}

			if (!q.options) q.options = [];
		});

		return s;
	});
});

async function animateChange(dir: "next" | "prev") {
	const el = containerRef.value;
	if (!el) return;

	await gsap.to(el.children, {
		y: dir === "next" ? -16 : 16,
		opacity: 0,
		duration: 0.25,
		ease: "power1.inOut",
		stagger: 0.015,
	});

	await nextTick();

	gsap.fromTo(
		el.children,
		{ y: dir === "next" ? 16 : -16, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.35, ease: "power2.out", stagger: 0.02 }
	);
}

async function nextStep() {
	if (currentStep.value < totalSteps.value) {
		await animateChange("next");
		currentStep.value++;
	}
}

async function prevStep() {
	if (currentStep.value > 1) {
		await animateChange("prev");
		currentStep.value--;
	}
}

async function submit() {
	try {
		const payload = {
			name: formData.value["Namn"],
			email: formData.value["E-post"],
			phone: formData.value["Telefonnummer"],
			data: filteredSummary.value,
		};
		await create("project-requests", payload);
		alert("Din förfrågan har skickats!");
		formData.value = {};
		currentStep.value = 1;
	} catch (err) {
		alert("Ett fel uppstod. Försök igen senare.");
	}
}
</script>

<template>
	<section class="py-5xl relative">
		<div class="w-full flex gap-3xl max-w-[1300px] px-md md:px-lg lg:px-2xl py-2xl">
			<div class="flex-1">
				<div class="relative mb-xl">
					<div class="absolute top-1/2 left-0 w-full h-[4px] bg-dark/20 -translate-y-1/2 rounded-full" />
					<div
						class="absolute top-1/2 left-0 h-[4px] bg-primary rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-1/2"
						:style="{ width: `${progress}%` }" />
					<div class="relative flex justify-between">
						<div
							v-for="(step, i) in steps"
							:key="step.title"
							class="flex flex-col items-center text-center w-full">
							<div
								class="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 mb-xl"
								:class="[
									i + 1 <= currentStep
										? 'bg-primary border-primary text-white'
										: 'border-gray text-gray',
								]">
								<span class="text-sm font-semibold">{{ i + 1 }}</span>
							</div>
							<p
								class="text-xs leading-tight max-w-[80px]"
								:class="i + 1 === currentStep ? 'text-primary font-semibold' : 'text-gray'">
								{{ step.title }}
							</p>
						</div>
					</div>
				</div>

				<h2 class="text-heading-xl font-bold text-black mb-xs">
					{{ steps[currentStep - 1]?.title }}
				</h2>
				<p class="text-black/80 mb-lg text-2xl">
					{{ steps[currentStep - 1]?.description }}
				</p>

				<div ref="containerRef" class="space-y-xl">
					<div v-if="isLastStep" class="space-y-xl">
						<FormField label="Namn"><Input v-model="formData['Namn']" placeholder="Ditt namn" /></FormField>
						<FormField label="Telefonnummer"
							><Input v-model="formData['Telefonnummer']" placeholder="Ditt nummer"
						/></FormField>
						<FormField label="E-post"
							><Input v-model="formData['E-post']" placeholder="Din e-post"
						/></FormField>
					</div>

					<form v-else class="space-y-xl min-h-[250px]">
						<div
							v-for="question in steps[currentStep - 1]?.questions"
							:key="question.label"
							class="space-y-md">
							<label class="block font-medium text-black/80 text-lg">{{ question.label }}</label>

							<div v-if="question.type === 'boolean'" class="flex gap-md">
								<div
									v-for="option in ['Ja', 'Nej']"
									:key="option"
									@click="formData[question.label] = option"
									class="cursor-pointer border border-gray px-3xl py-xs font-semibold select-none transition"
									:class="[
										formData[question.label] === option
											? 'bg-primary text-white border-primary'
											: 'hover:border-primary hover:text-primary',
									]">
									{{ option }}
								</div>
							</div>

							<div v-else-if="question.type === 'multi'" class="flex flex-wrap gap-lg">
								<div
									v-for="option in question.options"
									:key="option"
									@click="
										formData[question.label] = formData[question.label] || [];
										formData[question.label].includes(option)
											? (formData[question.label] = formData[question.label].filter(
													(o: string) => o !== option
												))
											: formData[question.label].push(option);
									"
									class="cursor-pointer border border-gray px-3xl py-xs font-semibold transition select-none"
									:class="[
										formData[question.label]?.includes(option)
											? 'bg-primary text-white'
											: 'hover:border-primary hover:text-primary',
									]">
									{{ option }}
								</div>
							</div>

							<div v-else-if="question.type === 'static'" class="flex flex-wrap gap-md">
								<div
									v-for="option in question.options"
									:key="option"
									class="border border-gray/30 bg-gray/10 px-3xl py-sm rounded-lg text-dark text-md font-medium cursor-default select-none">
									{{ option }}
								</div>
							</div>

							<div
								v-else-if="question.type === 'budget' || question.type === 'time'"
								class="flex flex-wrap gap-lg">
								<div
									v-for="option in question.options"
									:key="option"
									@click="formData[question.label] = option"
									class="cursor-pointer border border-gray px-3xl py-xs font-semibold transition select-none"
									:class="[
										formData[question.label] === option
											? 'bg-primary text-white'
											: 'hover:border-primary hover:text-primary',
									]">
									{{ option }}
								</div>
								<Input
									v-model="formData[question.label + 'Egen']"
									placeholder="Eget värde:"
									class="flex-1" />
							</div>

							<Textarea
								v-else-if="question.type === 'text'"
								v-model="formData[question.label]"
								placeholder="Skriv din kommentar här..."
								rows="4" />

							<Input
								v-else-if="question.type === 'input'"
								v-model="formData[question.label]"
								:placeholder="question.label" />
						</div>
					</form>
				</div>

				<div class="flex justify-between items-center pt-xl">
					<Button
						v-if="currentStep > 1"
						label="Tillbaka"
						icon="lucide:arrow-left"
						variant="outline"
						reversed
						@click="prevStep" />
					<Button
						v-if="!isLastStep"
						label="Nästa"
						icon="lucide:arrow-right"
						variant="primary"
						class="ml-auto"
						@click="nextStep" />
					<Button
						v-if="isLastStep"
						label="Skicka"
						icon="lucide:send"
						variant="primary"
						class="ml-auto"
						@click="submit" />
				</div>
			</div>

			<aside class="sticky top-24 bg-light border border-light/20 shadow-md p-xl h-fit space-y-lg">
				<h3 class="text-heading-md font-bold text-dark">Sammanfattning</h3>
				<div class="text-dark/80 text-sm">
					<div v-for="(v, key) in filteredSummary" :key="key" class="border-b border-light/20 pb-md">
						<p class="font-semibold text-md">{{ key }}</p>
						<p class="text-sm font-medium mt-xs">{{ Array.isArray(v) ? v.join(", ") : v || "—" }}</p>
					</div>
				</div>
				<p v-if="Object.keys(filteredSummary).length === 0" class="text-gray text-sm">
					Inga uppgifter ifyllda ännu.
				</p>
			</aside>
		</div>
	</section>
</template>
