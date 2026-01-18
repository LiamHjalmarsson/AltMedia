<script setup lang="ts">
const homeStore = useHomeStore();

useAppHead();

await useAsyncData("home-page", () => homeStore.fetchHomePage(), {
	server: true,
	lazy: false,
});

const { hero, hasForm, form, blocks } = storeToRefs(homeStore);

const payload = reactive<Record<string, string>>({ email: "", url: "" });

const fieldErrors = reactive<Record<string, string>>({ email: "", url: "" });

const loading = ref(false);

const success = ref(false);

const errorMessage = ref("");

const { create } = useStrapi();

async function submitAnalysisRequest() {
	loading.value = true;

	success.value = false;

	errorMessage.value = "";

	fieldErrors.email = "";

	fieldErrors.url = "";

	try {
		await create("analysis-requests", payload);

		success.value = true;
	} catch (err: any) {
		console.log(err.error);

		errorMessage.value = err?.error?.message || "Ett oväntat fel uppstod.";

		const missing = err?.error?.details?.missing;

		if (missing) {
			if (missing.email) fieldErrors.email = "E-post är obligatoriskt.";

			if (missing.url) fieldErrors.url = "URL är obligatoriskt.";
		}
	} finally {
		loading.value = false;
	}
}
</script>
<template>
	<Hero v-if="hero" :block="hero" :hasForm>
		<div v-if="form" class="max-w-[450px] w-full hidden lg:flex justify-end">
			<div class="w-full p-lg overflow-hidden">
				<div class="border border-black/5 bg-black/3 p-xl shadow-2xl backdrop-blur-2xl h-full">
					<h2 class="text-heading-lg font-bold mb-md">{{ form?.title }}</h2>

					<p class="mb-xl text-lg">{{ form?.description }}</p>

					<form @submit.prevent="submitAnalysisRequest" class="space-y-2xl">
						<FormField
							v-for="input in form.inputs"
							:key="input.name"
							:name="input.name"
							:label="input.label"
							hidden
							:error="fieldErrors[input.name]">
							<Input
								v-if="input.type === 'input'"
								:id="input.name"
								:name="input.name"
								v-model="payload[input.name]"
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
								:variant="form.button.variant" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</Hero>

	<BlockRenderer v-if="blocks?.length" :blocks="blocks" />
</template>
