<script setup lang="ts">
import type { BlockFeaturedComponent } from "~/types/components/block/featured";

const { block } = defineProps<{ block: BlockFeaturedComponent }>();

const featuredMode = computed(() => block.features);

const hasServices = computed(() => featuredMode.value === "tjänster" && (block.services?.length ?? 0) > 0);

const hasProjects = computed(() => featuredMode.value === "projekt" && (block.projects?.length ?? 0) > 0);

const hasArticles = computed(() => featuredMode.value === "artiklar" && (block.articles?.length ?? 0) > 0);
</script>

<template>
	<section class="relative py-3xl xl:py-5xl">
		<div class="mx-auto max-w-[1400px] px-sm md:px-lg xl:px-2xl">
			<Heading v-bind="block.heading" class="mb-xl md:mb-2xl xl:mb-3xl" />

			<div v-if="hasServices" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
				<FeaturedServiceCard v-for="service in block.services" :key="service.id" :service="service" />
			</div>

			<FeaturedProjects v-else-if="hasProjects" :projects="block.projects" />

			<div v-else-if="hasArticles">
				<ul class="grid gap-lg lg:gap-2xl">
					<li v-for="article in block.articles" :key="article.id">
						<FeaturedArticleCard :article="article" />
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
