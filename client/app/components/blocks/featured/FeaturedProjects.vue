<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import type { FeaturedProjectsBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FeaturedProjectsBlock }>();

const projectRefs = ref<HTMLElement[]>([]);

const setRef = (element: HTMLElement | null, index: number) => {
	if (element) projectRefs.value[index] = element;
};

onMounted(() => {
	nextTick(() => {
		const cards = projectRefs.value;

		if (!cards.length) {
			return;
		}

		gsap.set(cards, { flex: "1 1 0%" });

		cards.forEach((card, i) => {
			const title = card.querySelector(".project-title") as HTMLElement | null;

			if (!title) {
				return;
			}

			gsap.set(title, { opacity: 0, y: 20, pointerEvents: "none" });

			card.addEventListener("mouseenter", () => {
				gsap.killTweensOf([cards, title]);

				cards.forEach((c, j) => {
					gsap.to(c, {
						flex: j === i ? "3 1 0%" : "1 1 0%",
						duration: 0.5,
						ease: "power2.out",
					});
				});

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
					duration: 0.5,
					ease: "power2.inOut",
				});

				gsap.to(title, {
					opacity: 0,
					y: 20,
					duration: 0.3,
					ease: "power2.in",
				});
			});
		});
	});
});
</script>

<template>
	<Section>
		<Container>
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" :align_content="block.heading.align_content" />
			</div>

			<div class="flex gap-lg min-w-0">
				<div
					v-for="(project, index) in block.projects"
					:key="project.id"
					:ref="(element) => setRef(element as HTMLElement, index)"
					class="overflow-hidden rounded-xl shadow-2xl relative h-64">
					<NuxtLink :to="`/projects/${project.slug}`" class="flex justify-center items-center w-full h-full">
						<div class="absolute inset-0 w-full h-full">
							<NuxtImg
								v-if="project.cover?.url"
								:src="project.cover.url"
								:alt="project.cover.alternativeText || ''"
								class="object-cover w-full h-full" />
						</div>
						<h3
							class="project-title text-heading-lg font-semibold font-heading absolute z-20 text-secondary">
							{{ project.title }}
						</h3>
					</NuxtLink>
				</div>
			</div>
		</Container>
	</Section>
</template>
