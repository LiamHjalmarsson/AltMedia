<script setup lang="ts">
import type { ContactPage } from "~/types";

const globalStore = useGlobalStore();

const { findOne } = useStrapi();

const { data: contactPage } = await useAsyncData("contact-page", () => findOne<ContactPage>("contact"));

definePageMeta({
	layout: "minimal",
});

function handleSubmit(data: Record<string, any>) {}
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl pt-3xl">
			<div class="grid grid-cols-1 lg:grid-cols-5 gap-2xl">
				<div class="flex flex-col shadow-lg col-span-3">
					<div class="p-xl">
						<Heading :title="contactPage?.data?.form?.title || 'Skicka ett meddelande'" />

						<p v-if="contactPage?.data?.form?.description" class="mt-sm text-dark-gray">
							{{ contactPage?.data.form.description }}
						</p>

						<Form
							v-if="contactPage?.data?.form"
							:form="contactPage?.data.form"
							@submit="handleSubmit"
							class="mt-lg" />
					</div>
				</div>

				<div class="flex flex-col col-span-2">
					<div class="w-full p-lg flex flex-col shadow-lg">
						<h3 class="text-heading-lg font-bold mb-md">Kontakta</h3>

						<div class="flex items-center gap-xs text-lg mb-md" v-if="globalStore.contact?.phone">
							<Icon name="mdi:phone" size="20" />
							<span>{{ globalStore.contact.phone }}</span>
						</div>

						<div class="flex items-center gap-xs text-lg" v-if="globalStore.contact?.email">
							<Icon name="mdi:email" size="20" />
							<span>{{ globalStore.contact.email }}</span>
						</div>
					</div>

					<div
						v-if="globalStore.contact?.social_medias?.length"
						class="mt-xl w-full p-lg flex flex-col shadow-lg">
						<h3 class="text-heading-md font-semibold mb-md">Följ oss</h3>

						<div class="flex gap-md">
							<NuxtLink
								v-for="socialMedia in globalStore.contact.social_medias"
								:key="socialMedia.id"
								:to="socialMedia.url"
								target="_blank">
								<div
									class="bg-dark text-light flex justify-center items-center rounded-full border shadow-lg transition duration-300 w-10 h-10 p-xs">
									<Icon :name="socialMedia.icon.icon_name" size="28" />
								</div>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
