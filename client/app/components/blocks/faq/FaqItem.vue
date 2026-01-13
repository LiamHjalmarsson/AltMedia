<script setup lang="ts">
import type { FaqItem } from "~/types";

const { item, activeId, number } = defineProps<{
	item: FaqItem;
	activeId: number | null;
	number: number;
}>();

const emit = defineEmits(["toggle"]);

const { onEnter, onLeave } = useCollapse();

const isOpen = computed(() => activeId === item.id);

function toggle() {
	emit("toggle", item.id);
}
</script>

<template>
	<li
		class="px-md lg:px-lg py-xl lg:py-xl transition duration-300 border-b border-black/60 last:border-0"
		@click="toggle">
		<button
			type="button"
			:id="`faq-title-${item.id}`"
			:aria-expanded="isOpen"
			:aria-controls="`faq-answer-${item.id}`"
			class="flex items-start justify-between w-full">
			<div class="flex items-center space-x-xl">
				<span class="max-lg:hidden text-heading-sm lg:text-heading-md font-semibold font-heading text-primary">
					{{ number }}
				</span>
				<div class="text-heading-md font-bold flex-1 text-start leading-[1.25]">
					{{ item.question }}
				</div>
			</div>

			<Icon
				name="heroicons:chevron-down"
				size="20"
				aria-hidden="true"
				:class="['transition-transform duration-500', isOpen ? 'rotate-180' : '']" />
		</button>

		<Transition :css="false" @enter="onEnter" @leave="onLeave">
			<div
				v-show="isOpen"
				:id="`faq-answer-${item.id}`"
				:aria-labelledby="`faq-title-${item.id}`"
				class="overflow-hidden mt-sm">
				<StrapiBlocksText :nodes="item.answer" />
			</div>
		</Transition>
	</li>
</template>
