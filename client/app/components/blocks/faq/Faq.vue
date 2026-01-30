<script setup lang="ts">
import type { FaqBlock } from "~/types";

const { block } = defineProps<{ block: FaqBlock }>();

const expandedQuestionId = ref<number | null>(null);

function toggleExpandedQuestion(questionId: number) {
	expandedQuestionId.value = expandedQuestionId.value === questionId ? null : questionId;
}
</script>

<template>
	<section class="relative mt-3xl lg:mt-4xl">
		<div class="mx-auto max-w-[1300px] px-lg lg:px-3xl">
			<Heading v-bind="block.heading" class="mb-lg lg:mb-xl" />

			<ul class="flex flex-col w-full">
				<FaqItem
					v-for="(item, i) in block.items"
					:key="item.id"
					:item="item"
					:questionNumber="i + 1"
					:expandedQuestionId
					@toggle="toggleExpandedQuestion" />
			</ul>
		</div>
	</section>
</template>
