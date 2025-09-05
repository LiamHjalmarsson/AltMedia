<script setup lang="ts">
const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);
</script>

<template>
	<ul class="flex items-center max-lg:hidden">
		<li v-for="link in header?.links" :key="link.label" class="relative group">
			<MenuLink :link class="px-md py-xxs" />
		</li>
	</ul>
</template>
