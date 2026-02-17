<script setup lang="ts">
import type { BlockListComponent } from "~/types/components/block/list";
import type { StylesColorComponent } from "~/types/components/styles/color";
import { themeClasses } from "~/utils/theme";

const { block } = defineProps<{ block: BlockListComponent }>();

const theme = computed(() => themeClasses(block.color as StylesColorComponent));
</script>

<template>
	<section class="py-3xl xl:py-5xl relative" :class="theme.sectionClassName" :style="theme.sectionStyle">
		<NuxtImg
			v-if="block.background?.url"
			:src="block.background.url"
			sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
			format="webp,avif"
			quality="70"
			width="1600"
			height="900"
			loading="lazy"
			aria-hidden="true"
			class="absolute inset-0 w-full h-full object-cover opacity-10" />

		<div class="mx-auto w-full h-full max-w-[1400px] px-sm md:px-lg xl:px-2xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:description="block.heading.description"
				class="mb-lg md:mb-xl lg:mb-2xl xl:mb-3xl"
				:class="theme.contentTextClass" />

			<ul class="grid grid-cols-1 gap-3xl md:gap-4xl lg:gap-5xl xl:gap-6xl pt-lg xl:pt-xl">
				<ListItem
					v-for="(item, index) in block.items"
					:key="item.id"
					:item
					:index
					:showNumbers="block.show_numbers" />
			</ul>
		</div>
	</section>
</template>
