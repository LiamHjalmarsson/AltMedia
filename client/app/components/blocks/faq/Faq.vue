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
	<section class="relative py-3xl lg:py-4xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-md lg:mb-lg xl:mb-xl" />

			<div class="lg:grid lg:grid-cols-3 lg:space-x-3xl items-start">
				<div>
					<NuxtImg
						v-if="block.icon?.is_image && block.icon.image?.url"
						:src="block.icon.image.url"
						:alt="block.icon.image.alternativeText || block.heading.title"
						format="webp"
						:width="block.icon.image?.width || 600"
						:height="block.icon.image?.height || 400"
						quality="85"
						loading="lazy"
						class="shadow-lg w-full max-h-[350px] object-cover" />
				</div>

				<ul class="flex flex-col w-full space-y-xl col-span-2">
					<FaqItem
						v-for="(faq, i) in block.items"
						:key="faq.id"
						:item="faq"
						:number="i + 1"
						:activeId="activeId"
						@toggle="toggleAnswer" />
				</ul>
			</div>
		</div>
	</section>
</template>
