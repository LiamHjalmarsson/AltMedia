<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import gsap from "gsap";
import type { Project } from "~/types/content/collections";

defineProps<{ projects: Project[] }>();

const projectRefs = ref<HTMLElement[]>([]);

const setRef = (element: HTMLElement | null, index: number) => {
	if (element) projectRefs.value[index] = element;
};

const isDesktop = computed(() => window.matchMedia("(min-width: 1024px)").matches);

onMounted(() => {
	nextTick(() => {
		if (!isDesktop.value) return;

		const cards = projectRefs.value;
		if (!cards.length) return;

		gsap.set(cards, { flex: "1 1 0%" });

		cards.forEach((card, i) => {
			const title = card.querySelector(".project-title") as HTMLElement | null;

			const overlay = card.querySelector(".project-overlay") as HTMLElement | null;

			if (!title || !overlay) return;

			gsap.set(title, { opacity: 0, y: 30, pointerEvents: "none" });

			gsap.set(overlay, { opacity: 0 });

			card.addEventListener("mouseenter", () => {
				gsap.killTweensOf([cards, title, overlay]);

				cards.forEach((c, j) =>
					gsap.to(c, {
						flex: j === i ? "3 1 0%" : "1 1 0%",
						duration: 0.25,
						ease: "power2.out",
					})
				);

				gsap.to(overlay, {
					opacity: 0.5,
					duration: 0.18,
					ease: "power1.out",
				});

				gsap.to(title, {
					opacity: 1,
					y: -35,
					duration: 0.35,
					delay: 0.05,
					ease: "power2.out",
				});
			});

			card.addEventListener("mouseleave", () => {
				gsap.killTweensOf([cards, title, overlay]);

				gsap.to(cards, {
					flex: "1 1 0%",
					duration: 0.3,
					ease: "power2.inOut",
				});

				gsap.to(title, {
					opacity: 0,
					y: 20,
					duration: 0.3,
					ease: "power2.in",
				});

				gsap.to(overlay, {
					opacity: 0,
					duration: 0.15,
					ease: "power2.inOut",
				});
			});
		});
	});
});
</script>

<template>
	<div class="hidden lg:flex gap-lg min-w-0">
		<article
			v-for="(project, index) in projects"
			:key="project.id"
			:ref="(element) => setRef(element as HTMLElement, index)"
			class="overflow-hidden shadow-xl relative h-96 flex-1 transition-transform">
			<FeaturedProjectCard :project="project" />
		</article>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 gap-md lg:hidden">
		<FeaturedProjectCard
			v-for="(project, index) in projects"
			:key="project.id"
			:project="project"
			:class="[
				'overflow-hidden shadow-xl relative aspect-[4/3]',
				index % 5 === 0 ? 'col-span-2' : '',
				index % 7 === 0 ? 'row-span-2' : '',
			]" />
	</div>
</template>
