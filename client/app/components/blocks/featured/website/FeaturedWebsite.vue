<script setup lang="ts">
import type { FeaturedWebsiteBlock } from "~/types/content/blocks";
import FeaturedWebsiteCard from "./FeaturedWebsiteCard.vue";

const { block } = defineProps<{ block: FeaturedWebsiteBlock }>();
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:description="block.heading.description"
				class="mb-md lg:mb-lg xl:mb-xl" />

			<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3xl sm:gap-lg lg:gap-2xl mt-lg md:mt-xl lg:mt-2xl">
				<li v-for="(website, i) in block.page_example" :key="website.id">
					<FeaturedWebsiteCard
						:website="website"
						:class="[
							'transition-transform duration-300 lg:will-change-transform',
							i % 3 === 1 ? 'lg:scale-105' : '',
						]" />
				</li>
			</ul>

			<div class="mt-3xl w-full flex justify-center items-center">
				<ButtonLink label="Bygg din egna webb sajt" url="/startProject" class="mx-auto text-sm" />
			</div>
		</div>
	</section>
</template>
