<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);
</script>

<template>
	<Cta />

	<footer class="p-xxl bg-dark text-light mt-xxl">
		<Container>
			<nav aria-label="Footer" class="mb-xxl flex max-md:space-y-lg max-md:flex-col justify-between items-start">
				<div
					v-for="link in footer?.footer_columns"
					:key="link.title"
					class="flex flex-col font-heading max-lg:text-center">
					<NuxtLink :to="link.url" class="text-heading-xs lg:text-heading-sm font-semibold">
						{{ link.title }}
					</NuxtLink>

					<ul v-if="link.links?.length" class="mt-sm">
						<li v-for="subLink in link.links" :key="subLink.label" class="mb-sm">
							<MenuLink :link="subLink" />
						</li>
					</ul>
				</div>
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
			</div>
		</Container>
	</footer>
</template>
