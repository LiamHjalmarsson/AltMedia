<script setup lang="ts">
import type { StylesColorComponent } from "~/types/components/styles/color";
import type { ContactPage } from "~/types/singelTypes/contactPage";

type ContactPayload = { name: string; email: string; message: string };

const globalStore = useGlobalStore();

const { contact } = storeToRefs(globalStore);

const { findOne } = useStrapi();

const { data: contactPage } = await useAsyncData("contact-page", () => findOne<ContactPage>("contact"));

definePageMeta({
	layout: "minimal",
});

useAppHead(contactPage.value?.data?.seo || undefined);

const payload = reactive<ContactPayload>({ name: "", email: "", message: "" });

const fieldErrors = reactive<ContactPayload>({ name: "", email: "", message: "" });

const { create } = useStrapi();

const loading = ref(false);

const success = ref(false);

const theme = computed(() => themeClasses(contactPage.value?.data.color as StylesColorComponent));

async function submitForm() {
	loading.value = true;

	success.value = false;

	fieldErrors.email = "";

	fieldErrors.name = "";

	fieldErrors.message = "";

	try {
		await create("contact-submissions", payload);

		success.value = true;
	} catch (err: any) {
		const missing = err?.error?.details?.missing;

		if (missing) {
			if (missing.email) fieldErrors.email = "E-post är obligatoriskt.";

			if (missing.name) fieldErrors.name = "Namn är obligatoriskt.";

			if (missing.message) fieldErrors.message = "Meddelande är obligatoriskt.";
		}
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<section
		data-header-theme="dark"
		class="relative min-h-screen flex items-center overflow-hidden"
		:class="[theme.contentTextClass, contactPage?.data?.color?.theme === 'dark' ? 'bg-dark' : 'bg-white']">
		<div
			class="absolute inset-0 mix-blend-multiply pointer-events-none opacity-90"
			:class="theme.sectionClassName"
			:style="theme.sectionStyle"
			aria-hidden="true" />

		<NuxtImg
			v-if="contactPage?.data.cover"
			:src="contactPage.data.cover.url"
			format="webp,avif"
			quality="85"
			loading="lazy"
			role="presentation"
			aria-hidden="true"
			class="absolute inset-0 w-full h-full object-cover opacity-20" />

		<div
			class="relative z-10 mx-auto max-w-[1300px] w-full px-xl lg:px-3xl py-5xl justify-center items-center grid md:grid-cols-2 gap-2xl xl:gap-4xl">
			<div class="max-lg:pt-xl flex flex-col justify-center space-y-lg lg:space-y-2xl max-w-[500px]">
				<div>
					<h1
						class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl 2xl:text-heading-4xl mb-md drop-shadow-lg">
						{{ contactPage?.data.title }}
					</h1>

					<p class="max-w-[450px] text-lg md:text-xl lg:text-heading-sm xl:text-heading-md">
						{{ contactPage?.data.description }}
					</p>
				</div>

				<div class="space-y-md">
					<p v-if="contact?.phone" class="flex items-center gap-sm">
						<Icon name="mdi:phone" size="20" /> {{ contact.phone }}
					</p>
					<p v-if="contact?.email" class="flex items-center gap-sm">
						<Icon name="mdi:email" size="20" /> {{ contact.email }}
					</p>
				</div>

				<div v-if="contact?.social_medias?.length" class="flex gap-xl pt-md">
					<NuxtLink
						v-for="social_media in contact.social_medias"
						:key="social_media.id"
						:to="social_media.url"
						target="_blank"
						class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition">
						<Icon :name="social_media.icon?.icon_name" size="22" />
					</NuxtLink>
				</div>
			</div>

			<div class="flex lg:justify-end justify-center w-full">
				<div class="lg:p-2xl w-full max-w-[500px]">
					<h2
						class="font-semibold text-heading-sm md:text-heading-md lg:text-heading-lg tracking-tighter mb-lg lg:mb-xl">
						{{ contactPage?.data.form.title }}
					</h2>

					<form @submit.prevent="submitForm" class="space-y-xl">
						<FormField
							v-for="input in contactPage?.data.form.inputs"
							:key="input.name"
							:name="input.name"
							:error="fieldErrors[input.name as keyof ContactPayload]"
							:label="input.label">
							<Input
								v-if="input.type === 'input'"
								v-model="payload[input.name as keyof ContactPayload]"
								:id="input.name"
								:name="input.name"
								:placeholder="input.placeholder"
								:required="input.required"
								:type="input.input_type"
								class="border-transparent bg-white/20 rounded-lg" />

							<Textarea
								v-else-if="input.type === 'textarea'"
								v-model="payload[input.name as keyof ContactPayload]"
								:id="input.name"
								:name="input.name"
								:rows="input.rows || 4"
								:placeholder="input.placeholder"
								class="bg-white/20 rounded-lg" />
						</FormField>

						<div aria-live="polite" class="sr-only">
							<span v-if="success">Tack! Ditt meddelande har skickats.</span>
						</div>

						<Button
							type="submit"
							:variant="contactPage?.data.form.button.variant"
							:label="contactPage?.data.form.button.label"
							:size="contactPage?.data.form.button.size || 'md'"
							class="max-md:w-full" />
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
