<script setup lang="ts">
import type { FeaturedBlock } from "~/types";

type FeaturedMode = "tjänster" | "projekt" | "artiklar";

const { block } = defineProps<{ block: FeaturedBlock }>();

const featuredMode = computed(() => block.features as FeaturedMode);

const hasServices = computed(() => featuredMode.value === "tjänster" && (block.services?.length ?? 0) > 0);

const hasProjects = computed(() => featuredMode.value === "projekt" && (block.projects?.length ?? 0) > 0);

const hasArticles = computed(() => featuredMode.value === "artiklar" && (block.articles?.length ?? 0) > 0);
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-lg lg:px-3xl">
			<Heading v-bind="block.heading" class="mb-2xl" />

			<div v-if="hasServices" class="grid grid-cols-1 sm:grid-cols-2 lg:gap-2xl gap-xl">
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
