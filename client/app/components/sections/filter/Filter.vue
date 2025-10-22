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
		return (route.query.service as string) ?? (route.params.slug as string) ?? null;
	}
	return (route.query.service as string) ?? props.selected ?? null;
});

function onClick(service: Service) {
	if (props.basePath === "/services") {
		if (selectedSlug.value === service.slug) {
			router.push({ path: props.basePath });
		} else {
			router.push({ path: `${props.basePath}/${service.slug}` });
		}
	} else {
		emit("filterByService", service.slug);
	}
}
</script>

<template>
	<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1024px]">
		<nav aria-label="Filter services" class="flex justify-between items-center space-x-2xl">
			<button
				v-for="service in services"
				:key="service.id"
				@click="onClick(service)"
				class="flex flex-col items-center group cursor-pointer">
				<div
					class="border-primary bg-primary-disabled/50 shadow-primary/40 group-hover:bg-primary group-hover:scale-110 flex justify-center items-center rounded-full border shadow-lg text-primary transition duration-300"
					:class="selectedSlug === service.slug ? 'scale-110 bg-primary' : ''">
					<Icon
						v-if="service.icon?.icon_name"
						:name="service.icon.icon_name"
						size="30"
						class="text-primary group-hover:text-light transition" />
				</div>

				<p class="mt-xs text-md font-semibold text-primary">{{ service.title }}</p>

				<span
					class="mt-xs h-0.5 bg-primary transition-all duration-300"
					:class="selectedSlug === service.slug ? 'w-6' : 'w-0'"
					aria-hidden="true" />
			</button>
		</nav>
	</div>
</template>
