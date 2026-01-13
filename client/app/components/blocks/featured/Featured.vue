<script setup lang="ts">
import type { FeaturedBlock } from "~/types";

defineProps<{ block: FeaturedBlock }>();
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1400px] px-lg lg:px-3xl">
			<Heading v-bind="block.heading" class="mb-2xl" />

			<div
				v-if="block.features === 'tjänster'"
				class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg xl:gap-xl">
				<FeaturedServiceCard v-for="service in block.services" :key="service.id" :service="service" />
			</div>

			<FeaturedProjects v-else-if="block.features === 'projekt'" :projects="block.projects" />

			<div v-else-if="block.features === 'artiklar'">
				<ul class="grid gap-2xl">
					<li v-for="article in block.articles" :key="article.id">
						<FeaturedArticleCard :article="article" />
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
