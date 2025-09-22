<script setup lang="ts">
import type { FeaturedArticlesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedArticlesBlock }>();
</script>

<template>
	<Section>
		<Container>
			<div class="mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" />
			</div>

			<Grid class="md:grid-cols-3">
				<ArticleCard v-for="(article, index) in block.articles" :key="article.id + index" :article="article" />
			</Grid>
		</Container>
	</Section>
</template>
