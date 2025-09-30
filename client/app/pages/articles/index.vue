<script setup lang="ts">
const articleStore = useArticleStore();

const serviceStore = useServiceStore();

const route = useRoute();

const router = useRouter();

const { articles } = storeToRefs(articleStore);

const { services } = storeToRefs(serviceStore);

const selected = ref<string | null>((route.query.service as string) ?? null);

await useAsyncData("articles", () => articleStore.fetchArticles(selected.value), {
	server: true,
	watch: [selected],
});

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });

function onFilterCategory(title: string) {
	selected.value = selected.value === title ? null : title;

	router.push({
		query: { service: selected.value || undefined },
	});
}
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra artiklar" class="mt-xxl" align_content="center" />

			<Filter
				:services="services"
				:selected="selected"
				@filterByService="onFilterCategory"
				base-path="/articles" />

			<Grid class="grid-cols-3 gap-xxl mt-xl">
				<ArticleCard v-for="article in articles" :key="article.id" :article="article" />
			</Grid>
		</Container>
	</Section>
</template>
