<script setup lang="ts">
import type { BlockFeaturedComponent } from "~/types/components/block/featured";

const { block } = defineProps<{ block: BlockFeaturedComponent }>();

const featuredMode = computed(() => block.features);

const hasServices = computed(() => featuredMode.value === "tjänster" && (block.services?.length ?? 0) > 0);

const hasProjects = computed(() => featuredMode.value === "projekt" && (block.projects?.length ?? 0) > 0);

const hasArticles = computed(() => featuredMode.value === "artiklar" && (block.articles?.length ?? 0) > 0);
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading v-bind="block.heading" class="mb-xl lg:mb-2xl" />

			<div v-if="hasServices" class="grid grid-cols-1 md:grid-cols-2 md:gap-lg xl:gap-2xl gap-2xl">
				<FeaturedServiceCard v-for="service in block.services" :key="service.id" :service="service" />
			</div>

			<FeaturedProjects v-else-if="hasProjects" :projects="block.projects" />

			<div v-else-if="hasArticles">
				<ul class="grid gap-2xl">
					<li v-for="article in block.articles" :key="article.id">
						<FeaturedArticleCard :article="article" />
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
