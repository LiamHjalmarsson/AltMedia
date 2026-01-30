<script setup lang="ts">
const route = useRoute();

const articleStore = useArticleStore();
const { currentArticle } = storeToRefs(articleStore);

const slug = computed(() => String(route.params.slug || ""));

await useAsyncData(
	() => `article:${slug.value}`,
	() => articleStore.fetchArticleBySlug(slug.value),
	{ server: true, lazy: true, watch: [slug] },
);

const blocks = computed(() => currentArticle.value?.blocks ?? []);
console.log(blocks.value);

const sections = computed(() => blocks.value.filter((b) => b.__component === "block.content-section"));

const title = computed(() => currentArticle.value?.table_of_contents_title);

const publishedDate = computed(() => {
	const v = currentArticle.value?.published_date;
	return typeof v === "string" ? v : "";
});

const readingTime = computed(() => {
	const v = currentArticle.value?.reading_time_min;
	return v ? `${v} min` : "";
});

function scrollToSection(anchor: string) {
	const el = document.getElementById(anchor);
	if (!el) return;

	el.scrollIntoView({
		behavior: "smooth",
		block: "start",
	});
}
</script>
<template>
	<section class="relative overflow-hidden pt-6xl flex justify-center items-center lg:min-h-[80ch]">
		<div class="mx-auto w-full max-w-[1400px] px-xl lg:px-3xl max-lg:mt-2xl">
			<div class="flex flex-wrap gap-2xl lg:items-center max-h-[750px]">
				<div class="order-2 lg:order-1 flex-1">
					<h1 class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl font-semibold leading-[1.05]">
						{{ currentArticle?.title }}
					</h1>

					<p
						v-if="currentArticle?.description"
						class="my-lg text-lg sm:text-xl text-black/75 leading-relaxed max-w-[62ch]">
						{{ currentArticle.description }}
					</p>

					<div class="mt-lg flex items-center gap-lg text-sm text-black/70">
						<p v-if="publishedDate">{{ publishedDate }}</p>
						<span v-if="publishedDate && readingTime" class="h-3 w-px bg-black/15" />
						<p v-if="readingTime">{{ readingTime }}</p>
					</div>
				</div>

				<div class="order-1 lg:order-2 flex-1 min-w-[400px]">
					<div
						class="relative w-full overflow-hidden bg-black/5 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
						<NuxtImg
							class="absolute inset-0 w-full h-full object-cover"
							:src="currentArticle?.cover?.url"
							:alt="currentArticle?.cover?.alternativeText || currentArticle?.title"
							format="webp,avif"
							quality="85"
							loading="lazy"
							sizes="(max-width: 1024px) 100vw, 50vw" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto w-full max-w-[1300px] px-lg xl:px-3xl pb-5xl pt-2xl">
		<div class="flex gap-2xl xl:gap-4xl lg:items-start">
			<article
				:class="[currentArticle?.display_table_of_contents ? 'max-w-[78ch] space-y-3xl' : 'w-full space-y-lg']">
				<template v-for="block in blocks" :key="block.id">
					<Introduction
						v-if="block.__component === 'block.introduction'"
						:heading="block.heading"
						:content="block.content" />

					<ContentSection
						v-else-if="block.__component === 'block.content-section'"
						:title="block.title"
						:anchor="block.anchor"
						:content="block.body" />

					<Divider v-else-if="block.__component === 'ui.divider'" />
				</template>

				<StrapiBlocksText v-if="currentArticle?.content?.length" :nodes="currentArticle.content" />
			</article>

			<aside v-if="currentArticle?.display_table_of_contents" class="lg:sticky lg:top-6xl max-lg:hidden">
				<div class="p-xl ring-1 ring-black/10 shadow-sm">
					<p class="text-lg font-semibold text-black/80">
						{{ title || "I den här artikeln" }}
					</p>

					<nav class="mt-sm space-y-sm text-sm">
						<button
							v-for="section in sections"
							:key="section.anchor"
							type="button"
							class="block w-full text-left text-black/70 hover:text-black transition line-clamp-1"
							@click="scrollToSection(section.anchor)">
							{{ section.title }}
						</button>
					</nav>
				</div>
			</aside>
		</div>
	</section>
</template>
