<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import gsap from "gsap";
import type { FeaturedProjectsBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FeaturedProjectsBlock }>();

const projectRefs = ref<HTMLElement[]>([]);

const setRef = (element: HTMLElement | null, index: number) => {
	if (element) projectRefs.value[index] = element;
};

const isDesktop = computed(() => window.matchMedia("(min-width: 1024px)").matches);

onMounted(() => {
	nextTick(() => {
		if (!isDesktop.value) {
			return;
		}

		const cards = projectRefs.value;

		if (!cards.length) {
			return;
		}

		gsap.set(cards, { flex: "1 1 0%" });

		cards.forEach((card, i) => {
			const title = card.querySelector(".project-title") as HTMLElement | null;

			const overlay = card.querySelector(".project-overlay") as HTMLElement | null;

			if (!title || !overlay) {
				return;
			}

			gsap.set(title, { opacity: 0, y: 30, pointerEvents: "none" });

			gsap.set(overlay, { opacity: 0 });

			card.addEventListener("mouseenter", () => {
				gsap.killTweensOf([cards, title]);

				cards.forEach((card, j) => {
					gsap.to(card, {
						flex: j === i ? "3 1 0%" : "1 1 0%",
						duration: 0.15,
						ease: "power2.out",
					});
				});

				gsap.to(overlay, { opacity: 0.35, duration: 0.25, ease: "power2.out" });

				gsap.to(title, {
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: "power2.out",
				});
			});

			card.addEventListener("mouseleave", () => {
				gsap.killTweensOf([cards, title]);

				gsap.to(cards, {
					flex: "1 1 0%",
					duration: 0.3,
					ease: "power2.inOut",
				});

				gsap.to(title, {
					opacity: 0,
					y: 20,
					duration: 0.45,
					ease: "power2.in",
				});

				gsap.to(overlay, { opacity: 0, duration: 0.2, ease: "power2.inOut" });
			});
		});
	});
});
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" :align_content="block.heading.align_content" />
			</div>

			<div class="hidden lg:flex gap-lg min-w-0">
				<div
					v-for="(project, index) in block.projects"
					:key="project.id"
					:ref="(element) => setRef(element as HTMLElement, index)"
					class="overflow-hidden rounded-xl shadow-2xl relative h-96 flex-1 transition-all duration-300">
					<NuxtLink :to="`/projects/${project.slug}`" class="flex justify-center items-center w-full h-full">
						<NuxtImg
							v-if="project.cover?.url"
							:src="project.cover.url"
							:alt="project.cover.alternativeText || ''"
							densities="x1 x2"
							width="600"
							height="400"
							sizes="100vw sm:50vw md:33vw"
							format="webp"
							quality="85"
							placeholder
							loading="lazy"
							class="object-cover w-full h-full" />

						<div class="project-overlay absolute inset-0 bg-dark opacity-0 transition-opacity" />

						<h3
							class="project-title text-heading-lg font-semibold font-heading absolute z-20 text-secondary text-center px-md">
							{{ project.title }}
						</h3>
					</NuxtLink>
				</div>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-md lg:hidden">
				<div
					v-for="(project, index) in block.projects"
					:key="project.id"
					:class="[
						'overflow-hidden rounded-xl shadow-xl relative aspect-[4/3]',
						index % 5 === 0 ? 'col-span-2' : '',
						index % 7 === 0 ? 'row-span-2' : '',
					]">
					<NuxtLink :to="`/projects/${project.slug}`" class="block w-full h-full">
						<NuxtImg
							v-if="project.cover?.url"
							:src="project.cover.url"
							:alt="project.cover.alternativeText || ''"
							sizes="100vw sm:50vw"
							format="webp"
							quality="80"
							placeholder
							loading="lazy"
							class="object-cover w-full h-full" />

						<div
							class="absolute inset-0 flex items-end justify-start p-sm bg-gradient-to-t from-black/60 to-transparent">
							<h3 class="text-light text-sm sm:text-md font-semibold">{{ project.title }}</h3>
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
