<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Service } from "~/types/content/collections";

const props = defineProps<{ services: Service[] }>();

const route = useRoute();

const selected = computed(() => (route.params.slug as string) ?? null);

function getServiceLink(slug: string) {
	return selected.value === slug ? "/services" : `/services/${slug}`;
}
</script>

<template>
	<Container class="flex justify-between items-center space-x-xxl" size="md">
		<NuxtLink
			v-for="service in services"
			:key="service.id"
			:to="getServiceLink(service.slug)"
			class="flex justify-center items-center flex-col w-fit group cursor-pointer">
			<IconWrapper
				class="border-primary bg-primary-disabled/50 shadow-primary/40 transition group-hover:bg-primary group-hover:-translate-y-0.5 group-hover:scale-110 duration-300"
				:class="selected === service.slug ? 'scale-110 bg-primary' : ''">
				<Icon
					v-if="service.icon?.icon_name"
					:name="service.icon.icon_name"
					size="30"
					class="text-primary group-hover:text-light transition" />
			</IconWrapper>
			<p class="mt-xs text-md text-primary font-semibold first-letter:capitalize">
				{{ service.title }}
			</p>
			<span
				class="mt-xs h-0.5 bg-primary transition-all duration-300"
				:class="selected === service.slug ? 'w-6' : 'w-0'"
				aria-hidden="true" />
		</NuxtLink>
	</Container>
</template>
