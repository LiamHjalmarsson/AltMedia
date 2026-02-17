<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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

const articlePageAnimationRootElementRef = ref<HTMLElement | null>(null);

const articlePageHeroSectionElementRef = ref<HTMLElement | null>(null);

const articlePageHeroTextContainerElementRef = ref<HTMLElement | null>(null);

const articlePageHeroImageContainerElementRef = ref<HTMLElement | null>(null);

const articlePageBodyLayoutContainerElementRef = ref<HTMLElement | null>(null);

const articlePageTableOfContentsAsideElementRef = ref<HTMLElement | null>(null);

let articlePageGsapScopedContext: gsap.Context | undefined;

function initializeArticlePageGsapAnimations(): void {
	if (!import.meta.client) return;

	gsap.registerPlugin(ScrollTrigger);

	articlePageGsapScopedContext?.revert();

	articlePageGsapScopedContext = gsap.context(() => {
		ScrollTrigger.getAll().forEach((scrollTriggerInstance) => scrollTriggerInstance.kill());

		const articlePageIntroSequenceTimeline = gsap.timeline({
			defaults: { ease: "power2.out" },
		});

		if (articlePageHeroSectionElementRef.value) {
			articlePageIntroSequenceTimeline.from(articlePageHeroSectionElementRef.value, {
				opacity: 0,
				duration: 0.2,
			});
		}

		if (articlePageHeroImageContainerElementRef.value) {
			articlePageIntroSequenceTimeline.from(
				articlePageHeroImageContainerElementRef.value,
				{
					opacity: 0,
					scale: 1.03,
					duration: 0.6,
				},
				0,
			);
		}

		if (articlePageHeroTextContainerElementRef.value) {
			const articlePageHeroTextChildElements: Element[] = Array.from(
				articlePageHeroTextContainerElementRef.value.children,
			);

			articlePageIntroSequenceTimeline.from(
				articlePageHeroTextChildElements,
				{
					opacity: 0,
					y: 16,
					duration: 0.5,
					stagger: 0.08,
				},
				0.05,
			);
		}

		if (articlePageTableOfContentsAsideElementRef.value) {
			articlePageIntroSequenceTimeline.from(
				articlePageTableOfContentsAsideElementRef.value,
				{
					opacity: 0,
					x: 12,
					duration: 0.45,
				},
				0.1,
			);
		}

		const articlePageArticleElement = articlePageBodyLayoutContainerElementRef.value?.querySelector("article");
		if (articlePageArticleElement) {
			const articlePageArticleDirectChildElements: HTMLElement[] = Array.from(
				articlePageArticleElement.children,
			) as HTMLElement[];

			for (const articlePageArticleSectionElement of articlePageArticleDirectChildElements) {
				gsap.from(articlePageArticleSectionElement, {
					opacity: 0,
					y: 18,
					duration: 0.5,
					ease: "power2.out",
					scrollTrigger: {
						trigger: articlePageArticleSectionElement,
						start: "top 90%",
						toggleActions: "play none none none",
					},
				});
			}
		}
	}, articlePageAnimationRootElementRef);
}

onMounted(async () => {
	await nextTick();

	initializeArticlePageGsapAnimations();
});

watch(slug, async () => {
	if (!import.meta.client) return;

	await nextTick();

	initializeArticlePageGsapAnimations();
});

onBeforeUnmount(() => {
	articlePageGsapScopedContext?.revert();
});
</script>

<template>
	<div ref="articlePageAnimationRootElementRef" class="pt-2xl">
		<section
			ref="articlePageHeroSectionElementRef"
			class="relative overflow-hidden py-2xl md:py-3xl lg:py-5xl flex justify-center items-center xl:min-h-[100ch]">
			<div class="mx-auto w-full max-w-[1400px] px-sm md:px-lg xl:px-2xl">
				<div class="flex max-lg:flex-col gap-xl lg:gap-4xl lg:items-center max-h-[750px]">
					<div ref="articlePageHeroTextContainerElementRef" class="order-2 xl:order-1 flex-1">
						<h1 class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl">
							{{ currentArticle?.title }}
						</h1>

						<p
							v-if="currentArticle?.description"
							class="mt-md lg:mt-lg xl:mt-2xl text-lg md:text-xl lg:text-2xl text-black/80 max-w-[62ch]">
							{{ currentArticle.description }}
						</p>

						<div
							class="mt-md lg:mt-lg xl:mt-2xl flex items-center max-md:justify-center gap-lg text-sm text-black/70">
							<p v-if="publishedDate">{{ publishedDate }}</p>
							<span v-if="publishedDate && readingTime" class="h-3 w-px bg-black/15" />
							<p v-if="readingTime">{{ readingTime }}</p>
						</div>
					</div>

					<div class="order-1 xl:order-2 flex-1 lg:min-w-[400px]">
						<div
							ref="articlePageHeroImageContainerElementRef"
							class="relative w-full overflow-hidden bg-black/5 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] max-lg:max-h-[250px] rounded-4xl">
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

		<section
			ref="articlePageBodyLayoutContainerElementRef"
			class="mx-auto w-full max-w-[1400px] px-md md:px-lg lg:px-2xl pb-2xl lg:pb-5xl lg:pt-2xl">
			<div class="flex max-lg:flex-col-reverse gap-2xl lg:gap-4xl xl:items-start">
				<article
					:class="[
						currentArticle?.display_table_of_contents
							? 'flex-1 space-y-xl xl:space-y-2xl'
							: 'w-full space-y-xl',
					]">
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

					<div class="space-y-md">
						<StrapiBlocksText v-if="currentArticle?.content?.length" :nodes="currentArticle.content" />
					</div>
				</article>

				<aside
					v-if="currentArticle?.display_table_of_contents"
					ref="articlePageTableOfContentsAsideElementRef"
					class="lg:sticky top-6xl w-full lg:max-w-72 bg-black/5 p-xl rounded-4xl h-fit">
					<p class="text-md lg:text-lg text-black/80 font-semibold">
						{{ title || "I den här artikeln" }}
					</p>

					<nav class="mt-sm space-y-md text-xs">
						<button
							v-for="section in sections"
							:key="section.anchor"
							type="button"
							class="block w-full text-left text-black/80 hover:text-black transition line-clamp-1 cursor-pointer text-xs lg:text-md"
							@click="scrollToSection(section.anchor)">
							{{ section.title }}
						</button>
					</nav>
				</aside>
			</div>
		</section>
	</div>
</template>
