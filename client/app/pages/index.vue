<script setup lang="ts">
import type { AnalysisRequest } from "~/types/collectionTypes/analysisRequest";

type StrapiValidationError = {
	error?: {
		message?: string;
		details?: {
			missing?: Partial<Record<keyof AnalysisRequest, boolean>>;
		};
	};
};

const homeStore = useHomeStore();

useAppHead();

await useAsyncData("home-page", () => homeStore.fetchHomePage(), {
	server: true,
	lazy: false,
});

const { hero, hasForm, form, blocks } = storeToRefs(homeStore);

const payload = reactive<AnalysisRequest>({ email: "", url: "" });

const fieldErrors = reactive<AnalysisRequest>({ email: "", url: "" });

const submiting = ref(false);

const success = ref(false);

const errorMessage = ref("");

const { create } = useStrapi();

function resetErrors() {
	fieldErrors.email = "";

	fieldErrors.url = "";

	errorMessage.value = "";
}

function resetForm() {
	console.log("reset");
	payload.email = "";

	payload.url = "";
}

function isStrapiValidationError(error: unknown): error is StrapiValidationError {
	return typeof error === "object" && error !== null && "error" in error;
}

function setMissingFieldErrors(strapiError: StrapiValidationError) {
	const missingFields = strapiError.error?.details?.missing;

	if (!missingFields) {
		return;
	}

	if (missingFields.email) {
		fieldErrors.email = "E-post är obligatoriskt.";
	}

	if (missingFields.url) {
		fieldErrors.url = "URL är obligatoriskt.";
	}
}

async function submitAnalysisRequest() {
	submiting.value = true;

	success.value = false;

	resetErrors();

	try {
		await create("analysis-requests", payload);

		success.value = true;

		resetForm();
	} catch (err: any) {
		const strapiError = isStrapiValidationError(err) ? err : null;

		errorMessage.value = strapiError?.error?.message || "Ett oväntat fel uppstod.";

		setMissingFieldErrors(err);
	} finally {
		submiting.value = false;
	}
}
</script>
<template>
	<Hero v-if="hero" :block="hero" :hasForm>
		<div v-if="form" class="max-w-[450px] w-full hidden lg:flex justify-end">
			<div class="w-full p-lg overflow-hidden">
				<div class="border border-white/20 bg-white/20 p-xl shadow-2xl backdrop-blur-2xl h-full">
					<h2 class="text-heading-lg font-bold mb-md">{{ form?.title }}</h2>

					<p class="mb-lg text-md xl:text-lg">{{ form?.description }}</p>

					<form @submit.prevent="submitAnalysisRequest" class="space-y-xl">
						<FormField
							v-for="input in form.inputs"
							:key="input.name"
							:name="input.name"
							:label="input.label"
							hidden
							:error="fieldErrors[input.name as keyof AnalysisRequest]">
							<Input
								v-if="input.type === 'input'"
								:id="input.name"
								:name="input.name"
								v-model="payload[input.name as keyof AnalysisRequest]"
								:placeholder="input.placeholder"
								:required="input.required"
								:type="input.input_type"
								class="border-transparent" />
						</FormField>

						<div class="mt-lg">
							<Button
								type="submit"
								:label="form.button?.label"
								:icon="form.button.icon"
								:size="form.button.size || 'md'"
								:variant="form.button.variant"
								:disabled="submiting" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</Hero>

	<BlockRenderer v-if="blocks?.length" :blocks="blocks" />
</template>
