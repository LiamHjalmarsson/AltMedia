<script setup lang="ts">
import type { BlockFaqComponent } from "~/types/components/block/faq";

const { block } = defineProps<{ block: BlockFaqComponent }>();

const expandedQuestionIds = ref<Set<number>>(new Set());

function toggleExpandedQuestion(questionId: number) {
	const updated = new Set(expandedQuestionIds.value);

	if (updated.has(questionId)) {
		updated.delete(questionId);
	} else {
		updated.add(questionId);
	}

	expandedQuestionIds.value = updated;
}
</script>

<template>
	<section class="relative pt-3xl xl:pt-5xl">
		<div class="mx-auto max-w-[1400px] px-sm md:px-lg xl:px-2xl">
			<Heading v-bind="block.heading" class="mb-sm md:mb-lg lg:mb-lg" />

			<ul class="flex flex-col w-full">
				<FaqItem
					v-for="(item, i) in block.items"
					:key="item.id"
					:item="item"
					:questionNumber="i + 1"
					:expandedQuestionIds
					@toggle="toggleExpandedQuestion" />
			</ul>
		</div>
	</section>
</template>
