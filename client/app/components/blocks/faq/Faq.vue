<script setup lang="ts">
import type { BlockFaqComponent } from "~/types/components/block/faq";

const { block } = defineProps<{ block: BlockFaqComponent }>();

const expandedQuestionId = ref<number | null>(null);

function toggleExpandedQuestion(questionId: number) {
	expandedQuestionId.value = expandedQuestionId.value === questionId ? null : questionId;
}
</script>

<template>
	<section class="relative mt-3xl lg:mt-4xl">
		<div class="mx-auto max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading v-bind="block.heading" class="mb-sm md:mb-lg lg:mb-xl" />

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
