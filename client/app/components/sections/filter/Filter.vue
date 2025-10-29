<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { Service } from "~/types/content/collections";

const props = defineProps<{
	services: Service[];
	basePath: "/services" | "/projects" | "/articles";
	selected?: string | null;
}>();

const emit = defineEmits(["filterByService"]);
const route = useRoute();
const router = useRouter();

const selectedSlug = computed(() => {
	if (props.basePath === "/services") {
		return route.params.slug ?? null;
	}
	return props.selected ?? null;
});

function onClick(service: Service) {
	const slug = service.slug;
	if (props.basePath === "/services") {
		if (selectedSlug.value === slug) router.push({ path: props.basePath });
		else router.push({ path: `${props.basePath}/${slug}` });
	} else emit("filterByService", slug);
}
</script>

<template>
	<nav aria-label="Filter services" class="flex justify-center flex-wrap gap-xl text-center">
		<button
			v-for="service in services"
			:key="service.id"
			@click="onClick(service)"
			class="flex flex-col items-center group transition-transform duration-300 cursor-pointer">
			<div
				class="relative flex justify-center items-center w-[70px] h-[70px] rounded-full border border-light/10 bg-light/5 backdrop-blur-lg shadow-lg transition duration-300 group-hover:bg-primary/20 group-hover:scale-105"
				:class="selectedSlug === service.slug ? 'bg-primary text-light scale-110' : 'text-primary'">
				<Icon v-if="service.icon?.icon_name" :name="service.icon.icon_name" size="28" class="transition" />
			</div>

			<p
				class="mt-xs text-sm md:text-base font-semibold transition-colors duration-300"
				:class="selectedSlug === service.slug ? 'text-primary' : ''">
				{{ service.title }}
			</p>
		</button>
	</nav>
</template>
