<script setup lang="ts">
const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);
</script>

<template>
	<ul class="flex items-center max-lg:hidden space-x-lg">
		<li v-for="link in header?.links" :key="link.label" class="relative group">
			<MenuLink :link class="px-md py-2xs" />
		</li>

		<li>
			<NuxtLink
				v-if="header?.cta"
				:to="header.cta.url"
				class="font-semibold text-heading-xs leading-[1.8] px-lg py-xs bg-primary text-white font-headingtransition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
				{{ header.cta.label }}
			</NuxtLink>
		</li>
	</ul>
</template>
