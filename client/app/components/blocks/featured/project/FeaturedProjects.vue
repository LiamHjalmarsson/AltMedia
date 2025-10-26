<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import gsap from "gsap";
import type { FeaturedProjectsBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FeaturedProjectsBlock }>();

const projectRefs = ref<HTMLElement[]>([]);

const setRef = (element: HTMLElement | null, index: number) => {
	if (element) {
		projectRefs.value[index] = element;
	}
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
					y: -60,
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

				gsap.to(overlay, {
					opacity: 0,
					duration: 0.2,
					ease: "power2.inOut",
				});
			});
		});
	});
});
</script>

<template>
	<section class="relative flex justify-center items-center py-4xl">
		<div class="mx-auto w-full max-w-[1400px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<Heading
				v-bind="block.heading"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-x" />

			<div class="hidden lg:flex gap-lg min-w-0">
				<article
					v-for="(project, index) in block.projects"
					:key="project.id"
					:ref="(element) => setRef(element as HTMLElement, index)"
					class="overflow-hidden rounded-xl shadow-xl relative h-96 flex-1">
					<FeaturedProjectCard :project />
				</article>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-md lg:hidden">
				<FeaturedProjectCard
					v-for="(project, index) in block.projects"
					:key="project.id"
					:project
					:class="[
						'overflow-hidden rounded-xl shadow-xl relative aspect-[4/3]',
						index % 5 === 0 ? 'col-span-2' : '',
						index % 7 === 0 ? 'row-span-2' : '',
					]" />
			</div>
		</div>
	</section>
</template>
