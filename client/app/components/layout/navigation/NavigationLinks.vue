<script setup lang="ts">
const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);
</script>

<template>
	<ul class="flex items-center space-x-lg max-lg:hidden">
		<li v-for="link in header?.links" :key="link.label" class="group relative">
			<MenuLink :link class="px-md py-2xs" />
		</li>

		<li>
			<NuxtLink
				v-if="header?.cta"
				:to="header.cta.url"
				class="font-semibold text-heading-xs px-lg py-md bg-primary text-white font-heading transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full">
				{{ header.cta.label }}
			</NuxtLink>
		</li>
	</ul>
</template>
