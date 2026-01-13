<script setup lang="ts">
import type { ListBlock } from "~/types";

const { block } = defineProps<{ block: ListBlock }>();

const bgColor = computed(() => {
	if (!block.color) {
		return "bg-bg-dark text-white";
	}

	if (block.color.hex) {
		return { backgroundColor: block.color.hex };
	}

	switch (block.color.type) {
		case "primary":
			return "bg-primary";
		case "secondary":
			return "bg-secondary";
		default:
			return "bg-bg-dark";
	}
});

const textColor = computed(() => {
	if (!block.color) {
		return "text-white";
	}

	return block.color.theme === "dark" ? "text-black" : "text-white";
});
</script>

<template>
	<section
		class="pt-4xl pb-5xl relative"
		:class="!block.color?.hex ? bgColor : ''"
		:style="block.color?.hex ? bgColor : ''">
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

		<div class="mx-auto w-full h-full max-w-[1300px] px-lg lg:px-3xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:description="block.heading.description"
				class="mb-xl lg:mb-2xl xl:mb-2xl"
				:class="textColor" />

			<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 max-sm:gap-2xl sm:gap-xl lg:gap-2xl">
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
