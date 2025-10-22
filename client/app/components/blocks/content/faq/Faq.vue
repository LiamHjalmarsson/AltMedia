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
		<Container class="flex max-lg:flex-col justify-between">
			<div class="w-3/5 pr-2xl">
				<Heading :title="block.heading.title" :align_content="block.heading.align_content" />
				<div class="mt-xl overflow-hidden rounded-xl" v-if="block.icon.is_image">
					<NuxtImg
						:src="block.icon.image?.url"
						:alt="block.icon.image?.alternativeText || ''"
						format="webp"
						quality="85"
						placeholder
						loading="lazy"
						sizes="100vw sm:50vw md:500px"
						densities="x1 x2"
						class="rounded-xl" />
				</div>
			</div>

			<div class="flex flex-col flex-1 lg:pl-2xl">
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
