<script setup lang="ts">
const contactStore = useContactStore();

const globalStore = useGlobalStore();

const { contact } = storeToRefs(contactStore);

await useAsyncData("contact", () => contactStore.fetchContact(), { server: true });

definePageMeta({
	layout: "custom",
});

function handleSubmit(data: Record<string, any>) {
	console.log("Form submitted:", data);
}
</script>

<template>
	<Section class="min-h-[80vh]">
		<Container>
			<Grid class="grid-cols-3 gap-xxl">
				<Card class="col-span-2 pr-xxl">
					<div class="p-xxl">
						<Heading :title="contact?.form?.title || 'Skicka ett meddelande'" align_content="left" />

						<p v-if="contact?.form?.description" class="mt-sm text-dark-gray">
							{{ contact.form.description }}
						</p>

						<Form v-if="contact?.form" :form="contact.form" @submit="handleSubmit" class="mt-lg" />
					</div>
				</Card>

				<div class="flex flex-col">
					<Card class="w-full p-lg">
						<h3 class="text-heading-md font-bold">Kontakta</h3>

						<div class="flex items-center mt-md gap-xs" v-if="globalStore.contact?.phone">
							<Icon name="mdi:phone" />
							<span>{{ globalStore.contact.phone }}</span>
						</div>

						<div class="flex items-center mt-md gap-xs" v-if="globalStore.contact?.email">
							<Icon name="mdi:email" />
							<span>{{ globalStore.contact.email }}</span>
						</div>
					</Card>

					<Card class="mt-xl w-full p-lg" v-if="globalStore.contact?.social_medias?.length">
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
					</Card>
				</div>
			</Grid>
		</Container>
	</Section>
</template>
