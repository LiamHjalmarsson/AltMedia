<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer } = storeToRefs(globalStore);

const cta = computed(() => footer.value?.cta);
</script>

<template>
	<section v-if="cta" class="relative overflow-hidden text-light">
		<div class="relative px-xl py-3xl lg:p-3xl shadow-xl shadow-primary/10">
			<template v-if="cta.cover?.url">
				<video
					v-if="cta.cover.mime"
					class="absolute inset-0 w-full h-full object-cover opacity-30"
					autoplay
					muted
					loop
					playsinline>
					<source :src="cta.cover.url" type="video/mp4" />
				</video>

				<NuxtImg
					v-else
					:src="cta.cover.url"
					format="webp"
					quality="85"
					class="absolute inset-0 w-full h-full object-cover opacity-20"
					aria-hidden="true" />
			</template>

			<div class="absolute inset-0 bg-bg-dark/70"></div>

			<div class="relative text-center lg:p-3xl w-full max-w-[900px] mx-auto">
				<p v-if="cta.subtitle" class="text-sm font-semibold tracking-widest uppercase text-secondary/80">
					{{ cta.subtitle }}
				</p>

				<h2 class="mt-lg text-3xl font-semibold sm:text-4xl">
					{{ cta.title }}
				</h2>

				<p v-if="cta.description" class="mx-auto mt-lg text-base text-light/80">
					{{ cta.description }}
				</p>

				<div
					class="mt-2xl w-full flex flex-col items-center justify-center max-md:space-y-lg md:space-x-xl max-md:max-w-[250px] max-w-[500px] lg:max-w-[600px] md:flex-row mx-auto">
					<ButtonLink
						v-for="link in cta.links"
						:key="link.id"
						:label="link.label"
						:variant="link.variant"
						:url="link.url"
						:icon="link.icon"
						:aria-label="link.label"
						class="max-lg:flex-1 max-lg:w-full" />
				</div>
			</div>
		</div>
	</section>
</template>
