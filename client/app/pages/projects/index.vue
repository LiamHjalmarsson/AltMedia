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
	const res = await findOne<PageContent>("projects-page");

	return res.data;
});

useSeoMeta({
	title: page.value?.seo?.meta_title,
	description: page.value?.seo?.meta_description,
	ogTitle: page.value?.seo?.meta_title,
	ogDescription: page.value?.seo?.meta_description,
	ogUrl: page.value?.seo?.meta_canonical_url,
	twitterImage: page.value?.seo?.meta_image,
	ogImage: page.value?.seo?.meta_image,
	twitterCard: "summary_large_image",
});
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading
				:title="page?.title"
				:align_content="page?.align_content"
				:description="page?.description"
				class="my-xl" />

			<div class="grid md:grid-cols-2 gap-3xl">
				<article
					v-for="(project, i) in projects"
					:key="project.id"
					class="group transition-transform duration-500"
					:class="[i % 4 === 1 ? 'md:pt-2xl' : '', i % 4 === 2 ? 'md:pt-2xl' : '']">
					<NuxtLink :to="`/projects/${project.slug}`" class="space-y-lg">
						<div class="overflow-hidden block shadow-lg">
							<NuxtImg
								v-if="project.cover?.url"
								:src="project.cover.url"
								:alt="project.cover.alternativeText || project.title"
								format="webp,avif"
								quality="85"
								class="w-full h-[300px] object-cover"
								loading="lazy" />
						</div>

						<div class="space-y-xs">
							<h3
								class="text-heading-md font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
								{{ project.title }}
							</h3>

							<div v-if="project.services?.length" class="flex flex-wrap gap-xs text-sm text-dark-gray">
								<span
									v-for="service in project.services"
									:key="service.id"
									class="after:content-['·'] last:after:hidden after:px-xs">
									{{ service.title }}
								</span>
							</div>

							<span class="inline-flex items-center text-primary text-sm font-semibold group">
								<span>Visa projekt</span>
								<Icon
									name="lucide:arrow-right"
									size="16"
									class="ml-xs group-hover:translate-x-[3px] transition-transform duration-300" />
							</span>
						</div>
					</NuxtLink>
				</article>
			</div>
		</div>
	</section>
</template>
