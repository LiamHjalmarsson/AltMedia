<script setup lang="ts">
import type { BlockCtaComponent } from "~/types/components/block/cta";
import type { StylesColorComponent } from "~/types/components/styles/color";

const { block } = defineProps<{ block: BlockCtaComponent }>();

const theme = computed(() => themeClasses(block.color as StylesColorComponent));

const hasCoverMedia = computed(() => block.cover?.url);

const isCoverVideo = computed(() => {
	const mime = block.cover?.mime;

	return mime && mime.startsWith("video/");
});
</script>

<template>
	<section
		aria-labelledby="cta-title"
		class="relative overflow-hidden max-md:h-screen max-md:flex max-md:justify-center max-md:items-center"
		:class="theme.sectionClassName"
		:data-header-theme="block.background?.theme"
		:style="theme.sectionStyle">
		<div class="relative p-lg md:px-2xl py-3xl lg:p-3xl" :class="theme.contentTextClass">
			<template v-if="hasCoverMedia">
				<video
					v-if="isCoverVideo"
					class="absolute inset-0 w-full h-full object-cover opacity-90"
					aria-hidden="true"
					preload="none"
					autoplay
					muted
					loop
					playsinline>
					<source :src="block.cover!.url" type="video/mp4" />
				</video>

				<NuxtImg
					v-else
					:src="block.cover!.url"
					format="webp,avif"
					quality="85"
					class="absolute inset-0 w-full h-full object-cover opacity-20"
					aria-hidden="true" />
			</template>

			<div class="relative text-center lg:p-3xl w-full max-w-[1050px] mx-auto">
				<p v-if="block.subtitle" class="text-sm font-semibold tracking-widest uppercase text-secondary mb-xl">
					{{ block.subtitle }}
				</p>

				<h2 id="cta-title" class="text-heading-lg md:text-heading-xl lg:text-heading-2xl font-semibold">
					{{ block.title }}
				</h2>

				<p v-if="block.description" class="mx-auto mt-lg lg:mt-xl text-xs md:text-md lg:text-lg leading-[1.8]">
					{{ block.description }}
				</p>

				<div
					class="mt-xl lg:mt-2xl w-full flex flex-col items-center justify-center max-md:space-y-lg md:space-x-xl max-md:max-w-[250px] max-w-[500px] lg:max-w-[600px] md:flex-row mx-auto">
					<ButtonLink
						v-for="link in block.links"
						:key="link.id"
						:label="link.label"
						:variant="link.variant"
						:url="link.url"
						:reversed="link.reversed"
						:icon="link.icon"
						:size="link.size || 'md'" />
				</div>
			</div>
		</div>
	</section>
</template>
