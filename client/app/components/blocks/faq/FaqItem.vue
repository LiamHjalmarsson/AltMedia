<script setup lang="ts">
import type { FaqItemComponent } from "~/types/components/block/faq";

const { item, expandedQuestionIds, questionNumber } = defineProps<{
	item: FaqItemComponent;
	expandedQuestionIds: Set<number>;
	questionNumber: number;
}>();

const emit = defineEmits(["toggle"]);

const { expandAnimation, collapseAnimation } = useCollapse();

const isOpen = computed(() => expandedQuestionIds.has(item.id));

function toggle() {
	emit("toggle", item.id);
}
</script>

<template>
	<li class="lg:px-xl py-xl lg:py-2xl transition duration-300 border-b border-black/20 last:border-0" @click="toggle">
		<button
			type="button"
			:id="`faq-title-${item.id}`"
			:aria-expanded="isOpen"
			:aria-controls="`faq-answer-${item.id}`"
			class="flex items-center justify-between w-full space-x-sm">
			<div class="flex items-center space-x-xl">
				<span
					class="max-lg:hidden text-heading-xs md:text-heading-sm lg:text-heading-md font-semibold font-heading text-primary">
					{{ questionNumber }}
				</span>
				<div class="text-heading-xs md:text-heading-sm lg:text-heading-md font-bold flex-1 text-start">
					{{ item.question }}
				</div>
			</div>

			<div
				class="p-sm rounded-full flex justify-center items-center cursor-pointer group duration-300 transition"
				:class="[isOpen ? 'bg-black' : 'bg-black/10']">
				<Icon
					name="heroicons:chevron-down"
					size="20"
					aria-hidden="true"
					:class="[
						'transition-transform duration-200 font-bold',
						isOpen ? 'rotate-180 text-white' : 'text-black',
					]" />
			</div>
		</button>

		<Transition :css="false" @enter="expandAnimation" @leave="collapseAnimation">
			<div
				v-show="isOpen"
				:id="`faq-answer-${item.id}`"
				:aria-labelledby="`faq-title-${item.id}`"
				class="overflow-hidden mt-sm lg:px-2xl space-y-md">
				<StrapiBlocksText :nodes="item.answer" />
			</div>
		</Transition>
	</li>
</template>
