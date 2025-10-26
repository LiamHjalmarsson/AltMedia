<script setup lang="ts">
import type { FeaturedArticlesBlock } from "~/types/content/blocks";
import FeaturedArticleCard from "./FeaturedArticleCard.vue";

defineProps<{ block: FeaturedArticlesBlock }>();
</script>

<template>
	<section class="relative flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full max-w-[1400px]">
			<Heading
				v-bind="block.heading"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<ul class="grid md:grid-cols-3 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
				<li v-for="article in block.articles" :key="article.id">
					<FeaturedArticleCard :article />
				</li>
			</ul>
		</div>
	</section>
</template>
