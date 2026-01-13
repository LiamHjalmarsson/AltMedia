<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer } = storeToRefs(globalStore);

const cta = computed(() => footer.value?.cta);
</script>

<template>
	<section v-if="cta" aria-labelledby="cta-title" class="relative overflow-hidden text-white">
		<div class="relative px-lg py-3xl lg:p-3xl">
			<template v-if="cta.cover?.url">
				<video
					v-if="cta.cover.mime"
					class="absolute inset-0 w-full h-full object-cover opacity-90"
					aria-hidden="true"
					preload="none"
					autoplay
					muted
					loop
					playsinline>
					<source :src="cta.cover.url" type="video/mp4" />
				</video>

				<NuxtImg
					v-else
					:src="cta.cover.url"
					format="webp,avif"
					quality="85"
					class="absolute inset-0 w-full h-full object-cover opacity-20"
					aria-hidden="true" />
			</template>

			<div class="absolute inset-0 bg-bg-dark/80" />

			<div class="relative text-center lg:p-3xl w-full max-w-[1050px] mx-auto bg-bg-dark/0">
				<p v-if="cta.subtitle" class="text-sm font-semibold tracking-widest uppercase text-secondary">
					{{ cta.subtitle }}
				</p>

				<h2 id="cta-title" class="mt-xl text-heading-lg md:text-heading-xl lg:text-heading-2xl font-semibold">
					{{ cta.title }}
				</h2>

				<p v-if="cta.description" class="mx-auto mt-xl text-xl text-white">
					{{ cta.description }}
				</p>

				<div
					class="mt-3xl w-full flex flex-col items-center justify-center max-md:space-y-lg md:space-x-xl max-md:max-w-[250px] max-w-[500px] lg:max-w-[600px] md:flex-row mx-auto">
					<ButtonLink
						v-for="link in cta.links"
						:key="link.id"
						:label="link.label"
						:variant="link.variant"
						:url="link.url"
						:reversed="link.reversed"
						:icon="link.icon"
						:size="link.size || 'md'"
						class="max-lg:flex-1 max-lg:w-full" />
				</div>
			</div>
		</div>
	</section>
</template>
