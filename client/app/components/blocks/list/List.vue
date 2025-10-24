<script setup lang="ts">
import type { ListBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: ListBlock }>();
</script>

<template>
	<section
		class="bg-bg-dark text-light relative flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full max-w-[1600px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<ul class="flex flex-col gap-2xl">
				<ListItem v-for="(item, index) in block.items" :key="item.id" :item="item" :index="index" />
			</ul>
		</div>
	</section>
</template>
