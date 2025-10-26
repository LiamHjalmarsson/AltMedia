<script setup lang="ts">
import { ref } from "vue";
import type { FaqBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FaqBlock }>();

const activeId = ref<number | null>(null);

function toggleAnswer(id: number) {
	activeId.value = activeId.value === id ? null : id;
}
</script>

<template>
	<section class="relative flex justify-center items-center pt-4xl pb-3xl">
		<div class="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-4xl items-start">
			<div class="space-y-lg">
				<Heading :title="block.heading.title" :align_content="block.heading.align_content" />

				<NuxtImg
					v-if="block.icon?.is_image && block.icon.image?.url"
					:src="block.icon.image.url"
					:alt="block.icon.image.alternativeText || block.heading.title"
					format="webp"
					:width="block.icon.image?.width || 600"
					:height="block.icon.image?.height || 400"
					quality="85"
					loading="lazy"
					class="rounded-2xl shadow-lg max-h-[200px] lg:max-h-[400px] object-cover" />
			</div>

			<ul class="flex flex-col space-y-xl">
				<FaqItem
					v-for="(faq, i) in block.items"
					:key="faq.id"
					:item="faq"
					:number="i + 1"
					:activeId="activeId"
					@toggle="toggleAnswer" />
			</ul>
		</div>
	</section>
</template>
