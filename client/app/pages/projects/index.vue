<script setup lang="ts">
import type { PageContent } from "~/types";

const projectStore = useProjectStore();

const { projects } = storeToRefs(projectStore);

const { findOne } = useStrapi();

const { data: projectsData } = await useAsyncData("projects", () => projectStore.fetchProjects(), {
	server: true,
});

if (projectsData.value) projectStore.projects = projectsData.value;

const { data: page } = await useAsyncData("projectsPage", async () => {
	const { data } = await findOne<PageContent>("projects-page");

	return data;
});

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1400px] px-md md:px-lg lg:px-2xl">
			<Heading
				tag="h1"
				:title="page?.title"
				:align_content="page?.align_content || 'left'"
				:description="page?.description"
				class="my-4xl" />

			<ul class="grid md:grid-cols-2 gap-4xl">
				<li
					v-for="(project, i) in projects"
					:key="project.id"
					class="group transition-transform duration-500"
					:class="{
						'md:pt-3xl': i % 2 !== 0,
					}">
					<article>
						<NuxtLink
							:to="`/projects/${project.slug}`"
							:aria-label="`Läs mer om projektet ${project.title}`">
							<figure class="overflow-hidden block shadow-lg mb-xl">
								<NuxtImg
									v-if="project.cover?.url"
									:src="project.cover.url"
									:alt="project.cover.alternativeText || project.title"
									format="webp,avif"
									quality="85"
									loading="lazy"
									class="w-full h-[400px] object-cover" />
							</figure>

							<header>
								<h3
									class="text-heading-md sm:text-heading-md md:text-heading-lg xl:text-heading-xl font-bold group-hover:text-primary transition-colors duration-300 mb-sm">
									{{ project.title }}
								</h3>
							</header>
						</NuxtLink>
					</article>
				</li>
			</ul>
		</div>
	</section>
</template>
