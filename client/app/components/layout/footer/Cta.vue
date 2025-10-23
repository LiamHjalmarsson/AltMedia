<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer } = storeToRefs(globalStore);
</script>

<template>
	<section class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl my-2xl max-w-[1600px]">
		<div
			class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-dark via-bg-dark/90 to-bg-dark/80 text-light shadow-xl px-lg py-2xl sm:px-xl md:px-2xl md:py-2xl">
			<div
				class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-xl text-center md:flex-row md:gap-2xl md:text-left">
				<div class="flex-1 space-y-md">
					<h2
						class="text-heading-md sm:text-heading-lg md:text-heading-xl font-semibold leading-tight text-light">
						{{ footer?.cta?.title }}
					</h2>

					<p
						v-if="footer?.cta?.description"
						class="text-base sm:text-lg md:text-xl text-light/90 mx-auto md:mx-0">
						{{ footer.cta.description }}
					</p>
				</div>

				<div class="flex flex-wrap items-center justify-center gap-md sm:gap-lg w-full md:w-auto">
					<ButtonLink
						v-for="link in footer?.cta?.links"
						:key="link.id"
						:to="link.url"
						:variant="link.variant"
						class="min-w-[180px] text-center">
						{{ link.label }}
					</ButtonLink>
				</div>
			</div>
		</div>
	</section>
</template>
