<script setup lang="ts">
import type { ExamplesBuildBlock } from "~/types";

const { block } = defineProps<{ block: ExamplesBuildBlock }>();
</script>

<template>
	<section class="relative py-3xl lg:py-5xl h-screen flex justify-center items-center">
		<div class="mx-auto max-w-[1300px] px-lg md:px-xl lg:px-3xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:description="block.heading.description"
				class="mb-2xl lg:mb-xl xl:mb-2xl" />

			<!-- <ul
				role="list"
				class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-xl xl:gap-2xl mt-xl md:mt-2xl lg:mt-3xl">
				<li v-for="(item, i) in block.items" :key="item.id">
					<ExamplesBuildCard
						:item="item"
						:class="['transition-transform duration-300', i % 3 === 1 ? 'xl:scale-105' : '']" />
				</li>
			</ul> -->

			<div class="mt-3xl w-full flex justify-center items-center">
				<ButtonLink
					:label="block.button.label"
					:url="block.button.url"
					:variant="block.button.variant"
					:size="block.button.size || 'sm'"
					:icon="block.button.icon"
					class="mx-auto" />
			</div>
		</div>
	</section>
</template>
