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
	<Card
		@click="onToggle(item.id)"
		@keydown.enter.space="onToggle(item.id)"
		class="p-md cursor-pointer max-w-[750px] w-full">
		<div class="flex items-center justify-between w-ful px-xs">
			<span class="text-heading-sm lg:text-heading-md font-semibold font-heading text-secondary">
				{{ number }}
			</span>
			<h4 class="text-heading-2xs md:text-heading-xs font-semibold flex-1 pl-lg">
				{{ item.question }}
			</h4>
			<button
				:id="`faq-title-${item.id}`"
				class="text-left flex justify-between items-center focus:outline-none"
				:aria-expanded="activeId === item.id"
				:aria-controls="`faq-answer-${item.id}`"
				type="button">
				<Icon
					name="heroicons:chevron-down"
					:class="[
						'text-heading-xs transition-transform duration-300',
						activeId === item.id ? 'rotate-180' : '',
					]" />
			</button>
		</div>

		<div class="w-full">
			<Transition :css="false" @enter="onEnter" @leave="onLeave">
				<div
					v-show="activeId === item.id"
					:id="`faq-answer-${item.id}`"
					class="overflow-hidden mt-sm px-2xs"
					:aria-labelledby="`faq-title-${item.id}`">
					<StrapiBlocksText :nodes="item.answer" />
				</div>
			</Transition>
		</div>
	</Card>
</template>
