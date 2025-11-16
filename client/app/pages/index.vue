<script setup lang="ts">
const homeStore = useHomeStore();
useAppHead();

await useAsyncData("home-page", () => homeStore.fetchHomePage(), { server: true });

const { hero, hasForm, form, blocks } = storeToRefs(homeStore);

const payload = reactive<Record<string, string>>({
	email: "",
	url: "",
});

const { create } = useStrapi();

async function submitAnalysisRequest() {
	console.log(payload);
	await create("analysis-requests", payload);
}
</script>

<template>
	<Hero v-if="hero" :block="hero" :hasForm>
		<div v-if="form" class="max-w-[450px] w-full hidden lg:flex justify-end">
			<div class="w-full p-xs border border-white/10 overflow-hidden">
				<div class="border border-white/10 bg-white/10 p-lg shadow-2xl backdrop-blur-xl h-full">
					<h2 class="text-heading-lg text-white font-bold mb-md">
						{{ form?.title }}
					</h2>

					<p class="mb-xl text-md text-white">
						{{ form?.description }}
					</p>

					<form @submit.prevent="submitAnalysisRequest" class="space-y-xl">
						<FormField
							v-for="input in form.inputs"
							:key="input.name"
							:name="input.name"
							:label="input.label">
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
