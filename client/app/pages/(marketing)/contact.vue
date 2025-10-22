<script setup lang="ts">
const contactStore = useContactStore();

const globalStore = useGlobalStore();

const { contact } = storeToRefs(contactStore);

await useAsyncData("contact", () => contactStore.fetchContact(), { server: true });

definePageMeta({
	layout: "custom",
});

function handleSubmit(data: Record<string, any>) {}
</script>

<template>
	<section
		class="min-h-[80vh] relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<div class="grid grid-cols-3 gap-2xl">
				<div
					class="flex flex-col rounded-xl group transition transform duration-300 shadow-lg col-span-2 pr-2xl">
					<div class="p-2xl">
						<Heading :title="contact?.form?.title || 'Skicka ett meddelande'" align_content="left" />

						<p v-if="contact?.form?.description" class="mt-sm text-dark-gray">
							{{ contact.form.description }}
						</p>

						<Form v-if="contact?.form" :form="contact.form" @submit="handleSubmit" class="mt-lg" />
					</div>
				</div>

				<div class="flex flex-col">
					<div class="w-full p-lg flex flex-col rounded-xl group transition transform duration-300 shadow-lg">
						<h3 class="text-heading-md font-bold">Kontakta</h3>

						<div class="flex items-center mt-md gap-xs" v-if="globalStore.contact?.phone">
							<Icon name="mdi:phone" />
							<span>{{ globalStore.contact.phone }}</span>
						</div>

						<div class="flex items-center mt-md gap-xs" v-if="globalStore.contact?.email">
							<Icon name="mdi:email" />
							<span>{{ globalStore.contact.email }}</span>
						</div>
					</div>

					<div
						v-if="globalStore.contact?.social_medias?.length"
						class="mt-xl w-full p-lg flex flex-col rounded-xl group transition transform duration-300 shadow-lg">
						<h3 class="text-heading-md font-semibold mb-md">Följ oss</h3>

						<div class="flex gap-md">
							<NuxtLink
								v-for="socialMedia in globalStore.contact.social_medias"
								:key="socialMedia.id"
								:to="socialMedia.url"
								target="_blank">
								<IconWrapper class="bg-dark text-light">
									<Icon :name="socialMedia.icon.icon_name" size="28" />
								</IconWrapper>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
