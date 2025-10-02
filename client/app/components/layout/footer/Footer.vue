<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);
</script>

<template>
	<footer class="p-xxl bg-dark text-light">
		<Container>
			<nav aria-label="Footer" class="mb-xxl flex max-md:space-y-lg max-md:flex-col justify-between items-start">
				<FooterColumn v-for="column in footer?.footer_columns" :key="column.title" :column="column" />
			</nav>

			<div class="flex justify-between items-center">
				<div class="w-1/4" />

				<div class="text-center text-sm lg:text-md text-gray font-semibold w-2/4">
					© {{ new Date().getFullYear() }} Alt media. Alla rättigheter förbehållna.
				</div>

				<div class="flex justify-end items-center space-x-md w-1/4">
					<NuxtLink v-for="socialMedia in contact?.social_medias" :key="socialMedia.id" :to="socialMedia.url">
						<Icon :name="socialMedia.icon?.icon_name" size="24" />
					</NuxtLink>
				</div>

				<SocialLinks v-if="contact?.social_medias" :social-medias="contact.social_medias" />
			</div>
		</Container>
	</footer>
</template>
