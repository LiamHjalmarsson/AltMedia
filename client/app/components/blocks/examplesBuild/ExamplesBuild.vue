<script setup lang="ts">
import type { ExamplesBuildBlock } from "~/types";

const { block } = defineProps<{ block: ExamplesBuildBlock }>();
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-lg md:px-xl lg:px-3xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:description="block.heading.description"
				class="mb-xl lg:mb-lg xl:mb-xl" />

			<ul
				role="list"
				class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3xl sm:gap-lg lg:gap-2xl mt-lg md:mt-xl lg:mt-2xl">
				<li v-for="(item, i) in block.items" :key="item.id">
					<ExamplesBuildCard
						:item="item"
						:class="['transition-transform duration-300', i % 3 === 1 ? 'lg:scale-105' : '']" />
				</li>
			</ul>

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
