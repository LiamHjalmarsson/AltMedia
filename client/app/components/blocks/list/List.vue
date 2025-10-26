<script setup lang="ts">
import type { ListBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: ListBlock }>();
</script>

<template>
	<section class="bg-bg-dark/5 relative flex justify-center items-center pt-2xl pb-3xl">
		<div class="mx-auto w-full h-full max-w-[1400px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<ul class="flex flex-col gap-4xl">
				<ListItem v-for="(item, index) in block.items" :key="item.id" :item :index />
			</ul>
		</div>
	</section>
</template>
