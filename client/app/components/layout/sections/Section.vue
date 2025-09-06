<script setup lang="ts">
defineProps<{
	bgColor?: string;
}>();
</script>

<template>
	<section
		class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:md md:p-lg lg:p-xxl"
		:style="bgColor ? { backgroundColor: bgColor } : undefined">
		<slot />
	</section>
</template>
