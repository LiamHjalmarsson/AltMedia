<script setup lang="ts">
defineProps<{
	to?: string;
	hoverable?: boolean;
}>();
</script>

<template>
	<component
		:is="to ? 'NuxtLink' : 'div'"
		:to="to"
		:class="[
			'relative rounded-xl shadow-lg overflow-hidden transition duration-300',
			hoverable ? 'hover:scale-[1.02] hover:shadow-2xl' : '',
		]">
		<slot />
	</component>
</template>
