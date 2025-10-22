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
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<Heading title="Våra artiklar" class="mt-2xl" align_content="center" />

			<Filter
				:services="services"
				:selected="selected"
				@filterByService="onFilterCategory"
				base-path="/articles" />

			<div class="grid grid-cols-3 gap-2xl mt-xl">
				<ArticleCard v-for="article in articles" :key="article.id" :article="article" />
			</div>
		</div>
	</section>
</template>
