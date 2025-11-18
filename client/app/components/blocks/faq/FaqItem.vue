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
		class="p-md lg:p-lg border border-black/5 transition duration-300"
		:class="isOpen ? 'shadow-2xl' : 'shadow-lg'"
		@click="toggle">
		<button
			type="button"
			:id="`faq-title-${item.id}`"
			:aria-expanded="isOpen"
			:aria-controls="`faq-answer-${item.id}`"
			class="flex items-start justify-between w-full px-xs">
			<div class="flex items-center space-x-md">
				<span class="max-lg:hidden text-heading-sm lg:text-heading-md font-semibold font-heading text-primary">
					{{ number }}
				</span>

				<h3 class="text-md lg:text-heading-xs font-semibold flex-1 text-start">
					{{ item.question }}
				</h3>
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
				class="overflow-hidden mt-sm px-sm lg:px-xl leading-relaxed">
				<StrapiBlocksText :nodes="item.answer" />
			</div>
		</Transition>
	</li>
</template>
