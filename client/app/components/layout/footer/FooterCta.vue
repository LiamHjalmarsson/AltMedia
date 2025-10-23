<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer } = storeToRefs(globalStore);
</script>

<template>
	<section
		class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl my-2xl max-w-[1600px]"
		v-if="footer?.cta">
		<div
			class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-dark via-bg-dark/90 to-bg-dark/80 text-light shadow-xl px-lg py-2xl sm:px-xl md:px-2xl md:py-2xl">
			<div
				class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-xl text-center md:flex-row md:gap-2xl md:text-left">
				<CtaContent :title="footer.cta.title" :description="footer.cta.description" />

				<CtaButtons :links="footer.cta.links" />
			</div>
		</div>
	</section>
</template>
