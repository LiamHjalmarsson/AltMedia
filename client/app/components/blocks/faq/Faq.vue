<script setup lang="ts">
import { ref } from "vue";
import type { FaqBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FaqBlock }>();

const activeId = ref<number | null>(null);

function toggleAnswer(id: number) {
	activeId.value = activeId.value === id ? null : id;
}
</script>

<template>
	<section class="relative mt-3xl lg:mt-4xl">
		<div class="mx-auto max-w-[1300px] px-lg lg:px-3xl">
			<Heading v-bind="block.heading" class="mb-xl" />

			<ul class="flex flex-col w-full">
				<FaqItem
					v-for="(item, i) in block.items"
					:key="item.id"
					:item="item"
					:number="i + 1"
					:activeId="activeId"
					@toggle="toggleAnswer" />
			</ul>
		</div>
	</section>
</template>
