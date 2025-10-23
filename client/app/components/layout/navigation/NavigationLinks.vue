<script setup lang="ts">
const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);
</script>

<template>
	<ul role="menubar" class="flex items-center max-lg:hidden">
		<li v-for="link in header?.links" :key="link.label" role="none" class="relative group">
			<MenuLink role="menuitem" :link class="px-md py-2xs" />
		</li>
	</ul>
</template>
