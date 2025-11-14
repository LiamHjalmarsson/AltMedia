<script setup lang="ts">
import type { ContactPage } from "~/types";

const globalStore = useGlobalStore();

const { findOne } = useStrapi();

const { data: contactPage } = await useAsyncData("contact-page", () => findOne<ContactPage>("contact"));

const { contact } = storeToRefs(globalStore);

definePageMeta({
	layout: "minimal",
});

const form = reactive({
	name: "",
	email: "",
	message: "",
});

function submitForm() {}
</script>

<template>
	<section class="relative min-h-screen flex items-center bg-bg-dark text-white overflow-hidden">
		<div class="absolute inset-0 bg-primary/60 mix-blend-multiply pointer-events-none" aria-hidden="true" />

		<NuxtImg
			v-if="contactPage?.data.cover"
			:src="contactPage.data.cover.url"
			class="absolute inset-0 w-full h-full object-cover opacity-40"
			aria-hidden="true" />

		<div
			class="relative z-10 mx-auto max-w-[1300px] w-full px-xl lg:px-3xl py-5xl grid grid-cols-1 lg:grid-cols-2 gap-4xl">
			<div class="flex flex-col justify-center space-y-2xl">
				<div>
					<h1 class="text-heading-3xl font-extrabold mb-md drop-shadow-lg">{{ contactPage?.data.title }}</h1>

					<p class="max-w-[450px] text-lg leading-relaxed text-white/90">
						{{ contactPage?.data.description }}
					</p>
				</div>

				<div class="space-y-md text-white/90">
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
						class="w-12 h-12 border border-white/60 rounded-full flex items-center justify-center hover:bg-white/10 transition">
						<Icon :name="social_media.icon?.icon_name" size="22" />
					</NuxtLink>
				</div>
			</div>

			<div class="flex justify-end">
				<div class="text-white p-2xl w-full max-w-[500px]">
					<h3 class="text-heading-lg font-bold mb-xl">{{ contactPage?.data.form.title }}</h3>

					<form @submit.prevent="submitForm" class="space-y-xl">
						<FormField
							v-for="input in contactPage?.data.form.inputs"
							:key="input.name"
							:name="input.name"
							:label="input.label">
							<Input
								v-if="input.type === 'input'"
								:id="input.name"
								:name="input.name"
								:placeholder="input.placeholder"
								:required="input.required"
								:type="input.input_type"
								class="border-transparent bg-white/20" />

							<Textarea
								v-else-if="input.type === 'textarea'"
								:id="input.name"
								:name="input.name"
								:rows="input.rows || 4"
								:placeholder="input.placeholder"
								class="bg-white/20" />
						</FormField>

						<Button
							:type="contactPage?.data.form.button.type"
							:variant="contactPage?.data.form.button.variant"
							:label="contactPage?.data.form.button.label"
							:size="contactPage?.data.form.button.size || 'md'" />
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
