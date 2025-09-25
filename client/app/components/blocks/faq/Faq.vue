<script setup lang="ts">
import type { FaqBlock } from "~/types/content/blocks";

defineProps<{ block: FaqBlock }>();

const activeItemId = ref<number | null>(null);

const toggleAnswer = (id: number) => {
	activeItemId.value = activeItemId.value === id ? null : id;
};
</script>

<template>
	<Section>
		<Container class="flex justify-between space-x-xxl">
			<div>
				<Heading :title="block.heading.title" :align_content="block.heading.align_content" />
				<div class="mt-xl overflow-hidden rounded-xl">
					<NuxtImg
						v-if="block.icon.is_image"
						:src="block.icon.image?.url"
						:alt="block.icon.image?.alternativeText || ''"
						width="500"
						class="rounded-xl" />
				</div>
			</div>

			<div class="flex flex-col flex-1 pl-xxl pt-xl">
				<FaqItem
					v-for="(faq, i) in block.items"
					:key="i"
					@toggle="toggleAnswer"
					class="mb-xl"
					:item="faq"
					:number="i + 1"
					:activeId="activeItemId" />
			</div>
		</Container>
	</Section>
</template>
