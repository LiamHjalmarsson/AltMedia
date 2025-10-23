<script setup lang="ts">
import type { FaqItem } from "~/types/content/blocks";

defineProps<{
	number: number;
	activeId: number | null;
	item: FaqItem;
}>();

const emit = defineEmits(["toggle"]);

const { onEnter, onLeave } = useCollapse();

function onToggle(id: number) {
	emit("toggle", id);
}
</script>

<template>
	<div
		@click="onToggle(item.id)"
		@keydown.enter.space="onToggle(item.id)"
		role="button"
		tabindex="0"
		:aria-expanded="activeId === item.id"
		:aria-controls="`faq-answer-${item.id}`"
		class="p-md cursor-pointer max-w-[750px] w-full flex flex-col rounded-xl group transition transform duration-300 shadow-lg">
		<div class="flex items-center justify-between px-xs">
			<span class="text-heading-sm lg:text-heading-md font-semibold font-heading text-secondary">
				{{ number }}
			</span>

			<h3 class="text-heading-2xs md:text-heading-xs font-semibold flex-1 pl-lg">
				{{ item.question }}
			</h3>

			<button
				:id="`faq-title-${item.id}`"
				class="text-left flex justify-between items-center focus:outline-none cursor-pointer focus-visible:outline-primary"
				:aria-expanded="activeId === item.id"
				:aria-label="`Expandera frågan: ${item.question}`"
				:aria-controls="`faq-answer-${item.id}`"
				type="button">
				<Icon
					name="heroicons:chevron-down"
					:class="[
						'text-heading-xs transition-transform duration-300 cursor-pointer',
						activeId === item.id ? 'rotate-180' : '',
					]" />
			</button>
		</div>

		<Transition :css="false" @enter="onEnter" @leave="onLeave">
			<div v-show="activeId === item.id" class="overflow-hidden mt-sm px-2xs">
				<StrapiBlocksText :nodes="item.answer" />
			</div>
		</Transition>
	</div>
</template>
