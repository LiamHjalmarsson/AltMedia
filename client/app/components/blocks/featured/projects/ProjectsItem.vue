<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import type { FeaturedProject } from "~/types/content/blocks";

const { project } = defineProps<{ project: FeaturedProject }>();

const projectRootElement = ref<HTMLElement | null>(null);

onMounted(() => {
	if (!projectRootElement.value) return;

	const ctx = gsap.context(() => {
		const projectImageElement = projectRootElement.value?.querySelector(".project-img") as HTMLElement | null;
		const projectTitleElement = projectRootElement.value?.querySelector(".project-title") as HTMLElement | null;

		if (!projectImageElement || !projectTitleElement) return;

		// initial state (flyttat hit från mounted)
		gsap.set(projectImageElement, { scale: 1, filter: "blur(0px)", opacity: 1, willChange: "transform, filter" });
		gsap.set(projectTitleElement, { opacity: 0, y: 20, willChange: "opacity, transform" });
		gsap.set(projectRootElement.value, { scaleX: 1, willChange: "transform" });

		let tl: gsap.core.Timeline | null = null;

		function onEnter() {
			tl?.kill();
			tl = gsap.timeline({ overwrite: "auto" });
			tl.to(projectImageElement, { scale: 1.05, filter: "blur(10px)", duration: 0.3, ease: "power2.out" }, 0)
				.to(projectTitleElement, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0)
				.to(projectRootElement.value, { scaleX: 1.05, duration: 0.3, ease: "power2.out" }, 0);
		}

		function onLeave() {
			tl?.kill();
			tl = gsap.timeline({ overwrite: "auto" });
			tl.to(projectImageElement, { scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.inOut" }, 0)
				.to(projectTitleElement, { opacity: 0, y: 20, duration: 0.3, ease: "power2.inOut" }, 0)
				.to(projectRootElement.value, { scaleX: 1, duration: 0.3, ease: "power2.inOut" }, 0);
		}

		projectRootElement.value?.addEventListener("mouseenter", onEnter);
		projectRootElement.value?.addEventListener("mouseleave", onLeave);
	}, projectRootElement);

	// cleanup
	return () => ctx.revert();
});
</script>

<template>
	<div ref="projectRootElement" class="overflow-hidden rounded-xl shadow-2xl relative flex-1 min-w-0">
		<NuxtLink
			:to="`/projects/${project.slug}`"
			class="relative w-full h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center">
			<div class="project-img absolute inset-0 w-full h-full">
				<NuxtImg
					v-if="project.cover?.url"
					:src="project.cover.url"
					:alt="project.cover.alternativeText || ''"
					class="object-cover w-full h-full" />
			</div>
			<h3 class="project-title text-heading-lg font-semibold font-heading absolute z-20 text-secondary">
				{{ project.title }}
			</h3>
		</NuxtLink>
	</div>
</template>
