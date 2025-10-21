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
	<Section>
		<Container>
			<Heading title="Våra projekt" class="mt-2xl" align_content="center" />

			<Filter
				:services="services"
				base-path="/projects"
				:selected="selected"
				@filterByService="onFilterCategory" />

			<Grid class="grid-cols-3 gap-2xl mt-xl">
				<ProjectCard v-for="project in projects" :key="project.id" :project="project" />
			</Grid>
		</Container>
	</Section>
</template>
