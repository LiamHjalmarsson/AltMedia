<script setup lang="ts">
import type { FeaturedProjectsBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FeaturedProjectsBlock }>();
</script>

<template>
	<Section>
		<Container>
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" />
			</div>

			<div class="flex space-x-lg">
				<div
					v-for="project in block.projects"
					:key="project.id"
					ref="projectRootElement"
					class="overflow-hidden rounded-xl shadow-2xl relative flex-1 min-w-0">
					<NuxtLink
						:to="`/projekt/${project.slug}`"
						class="relative w-full h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center">
						<div class="project-img absolute inset-0 w-full h-full">
							<NuxtImg
								v-if="project.cover?.url"
								:src="project.cover.url"
								:alt="project.cover.alternativeText || ''"
								class="object-cover w-full h-full" />
						</div>
						<h3
							class="project-title text-heading-lg font-semibold font-heading absolute z-20 text-secondary">
							{{ project.title }}
						</h3>
					</NuxtLink>
				</div>
			</div>
		</Container>
	</Section>
</template>
