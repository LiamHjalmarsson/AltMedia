<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
import type { FeaturedProject } from "~/types/content/blocks";

const props = defineProps<{ project: FeaturedProject }>();

const slug = computed(() => `/projects/${props.project.slug}`);
</script>

<template>
	<div ref="root" class="overflow-hidden rounded-xl shadow-2xl relative flex-1 min-w-0">
		<NuxtLink
			:to="slug"
			class="relative w-full h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center">
			<div class="project-img absolute inset-0 w-full h-full">
				<NuxtImg
					v-if="project.cover?.url"
					:src="project.cover.url"
					:alt="project.cover.alternativeText || ''"
					class="object-cover w-full h-full" />
			</div>

			<h3 class="project-title text-heading-lg font-semibold font-heading absolute z-20 text-secondary">
				{{ project.title }}
			</h3>
		</NuxtLink>
	</div>
</template>
