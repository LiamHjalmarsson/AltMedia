<script setup lang="ts">
import type { FaqItem } from "~/types/content/blocks";

const { activeId, item, number } = defineProps<{
	number: number;
	activeId: number | null;
	item: FaqItem;
}>();

const emit = defineEmits(["toggle"]);

const { onEnter, onLeave } = useCollapse();

const isOpen = computed(() => activeId === item.id);

function onToggle(id: number) {
	emit("toggle", id);
}
</script>

<template>
	<li
		@click="onToggle(item.id)"
		@keydown.enter.space="onToggle(item.id)"
		role="button"
		tabindex="0"
		:aria-expanded="activeId === item.id"
		:aria-controls="`faq-answer-${item.id}`"
		class="p-md cursor-pointer group border border-dark/5 transition duration-300"
		:class="[isOpen ? 'shadow-2xl' : 'shadow-lg']">
		<button
			:id="`faq-title-${item.id}`"
			:aria-expanded="activeId === item.id"
			:aria-controls="`faq-answer-${item.id}`"
			class="flex items-center justify-between w-full px-xs">
			<div class="flex items-center space-x-md">
				<span class="text-heading-sm lg:text-heading-md font-semibold font-heading text-secondary">
					{{ number }}
				</span>

				<h3 class="text-heading-2xs md:text-heading-xs font-semibold flex-1 text-start">
					{{ item.question }}
				</h3>
			</div>

			<Icon
				name="heroicons:chevron-down"
				size="20"
				:class="[
					'text-heading-xs transition-transform duration-500 cursor-pointer',
					isOpen ? 'rotate-180' : '',
				]" />
		</button>

		<Transition :css="false" @enter="onEnter" @leave="onLeave">
			<div
				v-show="isOpen"
				:id="`faq-answer-${item.id}`"
				:aria-labelledby="`faq-title-${item.id}`"
				class="overflow-hidden mt-sm px-xl leading-relaxed">
				<StrapiBlocksText :nodes="item.answer" />
			</div>
		</Transition>
	</li>
</template>
