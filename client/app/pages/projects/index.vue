<script setup lang="ts">
const projectStore = useProjectStore();

const serviceStore = useServiceStore();

const route = useRoute();

const router = useRouter();

const { projects } = storeToRefs(projectStore);

const { services } = storeToRefs(serviceStore);

const selected = ref<string | null>((route.query.service as string) ?? null);

await useAsyncData("projects", () => projectStore.fetchProjects(selected.value), { server: true, watch: [selected] });

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });

function onFilterCategory(slug: string) {
	selected.value = selected.value === slug ? null : slug;

	router.push({
		query: { service: selected.value || undefined },
	});
}
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<Heading title="Våra projekt" class="mt-2xl" align_content="center" />

			<Filter
				:services="services"
				base-path="/projects"
				:selected="selected"
				@filterByService="onFilterCategory" />

			<div class="grid grid-cols-3 gap-2xl mt-xl">
				<ProjectCard v-for="project in projects" :key="project.id" :project="project" />
			</div>
		</div>
	</section>
</template>
