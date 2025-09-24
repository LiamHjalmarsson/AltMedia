<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { Service } from "~/types/content/collections";

const props = defineProps<{
	services: Service[];
	basePath: "/services" | "/projects" | "/articles";
}>();

const route = useRoute();

const router = useRouter();

const selected = computed(() => route.params.slug as string | null);

function onServiceClick(slug: string) {
	console.log(slug);
	if (selected.value === slug) {
		router.push({ path: props.basePath });
	} else {
		router.push({ path: `${props.basePath}/${slug}` });
	}
}
</script>

<template>
	<Container size="md">
		<nav aria-label="Filter services" class="flex justify-between items-center space-x-xxl">
			<button
				v-for="service in services"
				:key="service.id"
				@click="onServiceClick(service.slug)"
				class="flex flex-col items-center group cursor-pointer">
				<IconWrapper
					class="border-primary bg-primary-disabled/50 shadow-primary/40 transition group-hover:bg-primary group-hover:scale-110 duration-300"
					:class="selected === service.slug ? 'scale-110 bg-primary' : ''">
					<Icon
						v-if="service.icon?.icon_name"
						:name="service.icon.icon_name"
						size="30"
						class="text-primary group-hover:text-light transition" />
				</IconWrapper>
				<p class="mt-xs text-md text-primary font-semibold">{{ service.title }}</p>
				<span
					class="mt-xs h-0.5 bg-primary transition-all duration-300"
					:class="selected === service.slug ? 'w-6' : 'w-0'"
					aria-hidden="true" />
			</button>
		</nav>
	</Container>
</template>
