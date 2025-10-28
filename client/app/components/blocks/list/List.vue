<script setup lang="ts">
import type { ListBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: ListBlock }>();
</script>

<template>
	<section class="bg-dark text-light pt-3xl pb-4xl">
		<div class="mx-auto w-full h-full max-w-[1300px] px-3xl">
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
