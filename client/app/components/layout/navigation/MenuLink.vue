<script setup lang="ts">
import type { UiMenuLinkComponent } from "~/types/components/global/menuLink";

const props = defineProps<{ link: UiMenuLinkComponent }>();

const route = useRoute();

const isCurrentPage = computed(() => {
	return route.path === props.link.url;
});
</script>

<template>
	<NuxtLink
		:to="link.url"
		:aria-current="isCurrentPage ? 'page' : undefined"
		class="font-bold leading-[1.8] text-md relative inline-block transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
		{{ link.label }}

		<span
			aria-hidden="true"
			class="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all duration-300 lg:group-hover:w-full lg:group-hover:left-0" />
	</NuxtLink>
</template>
