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
	<section class="relative py-3xl lg:py-4xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<Heading v-bind="block.heading" class="mb-md lg:mb-lg xl:mb-xl" />

			<ul class="flex flex-col w-full space-y-xl">
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
