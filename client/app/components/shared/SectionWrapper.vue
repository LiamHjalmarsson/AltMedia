<script setup lang="ts">
defineProps<{
	tag?: string;
	bg?: string;
}>();
</script>

<template>
	<component
		:is="tag || 'section'"
		:class="[
			'relative flex justify-center items-center w-full p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl',
			bg || 'bg-transparent',
		]">
		<div class="w-full" :class="['mx-auto px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl']">
			<slot />
		</div>
	</component>
</template>
