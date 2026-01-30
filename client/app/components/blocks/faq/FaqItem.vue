<script setup lang="ts">
import type { FaqItem } from "~/types";

const { item, expandedQuestionId, questionNumber } = defineProps<{
	item: FaqItem;
	expandedQuestionId: number | null;
	questionNumber: number;
}>();

const emit = defineEmits(["toggle"]);

const { expandAnimation, collapseAnimation } = useCollapse();

const isOpen = computed(() => expandedQuestionId === item.id);

function toggle() {
	emit("toggle", item.id);
}
</script>

<template>
	<li class="lg:px-xl py-xl lg:py-xl transition duration-300 border-b border-black/60 last:border-0" @click="toggle">
		<button
			type="button"
			:id="`faq-title-${item.id}`"
			:aria-expanded="isOpen"
			:aria-controls="`faq-answer-${item.id}`"
			class="flex items-center justify-between w-full">
			<div class="flex items-center space-x-lg">
				<span
					class="max-lg:hidden text-heading-xs md:text-heading-sm lg:text-heading-md font-semibold font-heading text-primary">
					{{ questionNumber }}
				</span>
				<div
					class="text-heading-xs md:text-heading-sm lg:text-heading-md font-bold flex-1 text-start leading-[1.25]">
					{{ item.question }}
				</div>
			</div>

			<Icon
				name="heroicons:chevron-down"
				size="20"
				aria-hidden="true"
				:class="['transition-transform duration-500', isOpen ? 'rotate-180' : '']" />
		</button>

		<Transition :css="false" @enter="expandAnimation" @leave="collapseAnimation">
			<div
				v-show="isOpen"
				:id="`faq-answer-${item.id}`"
				:aria-labelledby="`faq-title-${item.id}`"
				class="overflow-hidden mt-sm lg:px-xl space-y-md">
				<StrapiBlocksText :nodes="item.answer" />
			</div>
		</Transition>
	</li>
</template>
