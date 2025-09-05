<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer } = storeToRefs(globalStore);
</script>

<template>
	<Container>
		<div class="bg-bg-dark rounded-xl text-light p-2xl shadow-2xl">
			<div class="flex w-full max-md:flex-col max-md:space-y-xl justify-between items-center">
				<div>
					<h3
						class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl font-semibold max-lg:text-center">
						{{ footer?.cta?.title }}
					</h3>
					<p v-if="footer?.cta?.description" class="text-sm sm:text-md md:text-lg lg:text-xl">
						{{ footer.cta.description }}
					</p>
				</div>
				<ButtonLink v-for="link in footer?.cta?.links" :to="link.url" :variant="link.variant">
					{{ link.label }}
				</ButtonLink>
			</div>
		</div>
	</Container>
</template>
